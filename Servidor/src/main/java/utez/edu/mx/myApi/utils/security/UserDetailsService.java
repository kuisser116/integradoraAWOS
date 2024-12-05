package utez.edu.mx.myApi.utils.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import utez.edu.mx.myApi.employee.Employee;
import utez.edu.mx.myApi.employee.EmployeeRepository;

import java.util.Collections;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Buscar el usuario por nombre de usuario
        Employee employee = employeeRepository.findByUser(username);
        if(employee == null) {
            throw new UsernameNotFoundException("Usuario no encontrado: " + username);
        }

        //Convertir el rol a GrantedAuthority
        GrantedAuthority authority = new SimpleGrantedAuthority(employee.getRol().getName());

        return new org.springframework.security.core.userdetails.User(
                employee.getUser(),
                employee.getPassword(),
                Collections.singleton(authority)
        );
    }
}