package utez.edu.mx.myApi.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.myApi.auth.DTO.AuthLoginDTO;
import utez.edu.mx.myApi.employee.Employee;
import utez.edu.mx.myApi.employee.EmployeeDetailslmpl;
import utez.edu.mx.myApi.employee.EmployeeRepository;
import utez.edu.mx.myApi.utils.CustomResponseEntity;
import utez.edu.mx.myApi.utils.security.JWTUtil;


@Service
public class AuthService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CustomResponseEntity customResponseEntity;

    @Autowired
    private JWTUtil jwtUtil;

    @Transactional(readOnly = true)
    public ResponseEntity<?> login(AuthLoginDTO authLoginDTO) {
        Employee found = employeeRepository.findByPasswordAndEmailOrUsername(
                authLoginDTO.getPassword(),
                authLoginDTO.getUser()
        );
        if(found == null) {
            return customResponseEntity.get404Response();
        } else {
            try {
                UserDetails userDetails = new EmployeeDetailslmpl(found);
                return customResponseEntity.getOkResponse(
                        "Inicio de sesión exitoso",
                        "OK",
                        200,
                        jwtUtil.generateToken(userDetails)
                );
            } catch (Exception e) {
                System.out.println(e.getMessage());
                e.printStackTrace();
                return customResponseEntity.get400Response();
            }
        }
    }

}
