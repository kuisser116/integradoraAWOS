package utez.edu.mx.myApi.ResetPassword;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utez.edu.mx.myApi.employee.Employee;
import utez.edu.mx.myApi.employee.EmployeeRepository;

import java.util.Optional;

@Service
public class EmailService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    public String sendEmail(String email) {
        Optional<Employee> employeeOptional = employeeRepository.findByeMail(email);

        if (employeeOptional.isEmpty()) {
            return "Correo no encontrado en el sistema.";
        }

        Employee employee = employeeOptional.get();
        String passwordToSend = employee.getPassword();

        // Aquí puedes generar un token o enviar la contraseña directamente
        String subject = "Recuperación de Contraseña";
        String body = "Hola " + employee.getFullName() + ",\n\nTu contraseña es: " + passwordToSend;

        emailSenderService.sendEmail(email, subject, body);

        return "Correo enviado exitosamente.";
    }
}
