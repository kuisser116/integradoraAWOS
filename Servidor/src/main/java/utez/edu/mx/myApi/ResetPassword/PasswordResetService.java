package utez.edu.mx.myApi.ResetPassword;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import utez.edu.mx.myApi.employee.Employee;
import utez.edu.mx.myApi.employee.EmployeeRepository;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final long TOKEN_EXPIRY_MINUTES = 15;

    public void sendResetEmail(String email) {
        Employee user = employeeRepository.findByEMail(email)
                .orElseThrow(() -> new RuntimeException("Correo no registrado"));

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setTokenExpiryDate(LocalDateTime.now().plusMinutes(TOKEN_EXPIRY_MINUTES));
        employeeRepository.save(user);

        String resetLink = "http://localhost:8080/password-reset?token=" + token;
        emailService.sendEmail(email, "Recuperación de contraseña", "Haz clic aquí: " + resetLink);
    }

    public void resetPassword(String token, String newPassword) {
        Employee user = employeeRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido o expirado"));

        if (user.getTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expirado");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setTokenExpiryDate(null);
        employeeRepository.save(user);
    }
}
