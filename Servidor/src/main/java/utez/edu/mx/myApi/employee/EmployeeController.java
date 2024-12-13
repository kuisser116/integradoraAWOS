package utez.edu.mx.myApi.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.myApi.department.Department;
import utez.edu.mx.myApi.rol.Rol;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = {"*"})
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return employeeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") long id) {
        return employeeService.findById(id);
    }

    @GetMapping("/{username}/role")
    public ResponseEntity<?> getUserRole(@PathVariable("username") String username) {
        try {
            Rol role = employeeService.findUserRoleByUsername(username);
            if (role != null) {
                return ResponseEntity.ok(role);
            } else {
                return ResponseEntity.status(404).body("Usuario no encontrado o rol no asignado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno del servidor");
        }
    }



    @GetMapping("/{username}/department")
    public ResponseEntity<?> getDepartmentByUser(@PathVariable("username") String username) {
        try {
            String departmentName = employeeService.getDepartmentNameByUser(username);
            if (departmentName != null) {
                Map<String, String> response = new HashMap<>();
                response.put("department", departmentName);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("Usuario no encontrado o departamento no asignado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno del servidor");
        }
    }

    @GetMapping("/{username}/department/id")
    public ResponseEntity<?> getDepartmentIdByUser(@PathVariable("username") String username) {
        try {
            String departmentId = employeeService.getDepartmentIdByUser(username);
            if (departmentId != null) {
                Map<String, String> response = new HashMap<>();
                response.put("department", departmentId);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("Usuario no encontrado o departamento no asignado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno del servidor");
        }
    }

    @GetMapping("/{username}/department/id/category")
    public ResponseEntity<?> getDepartmentCategoryIdByUser(@PathVariable("username") String username) {
        try {
            String categoryId = employeeService.getDepartmentCategoryIdByUser(username);
            if (categoryId != null) {
                Map<String, String> response = new HashMap<>();
                response.put("department", categoryId);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("Usuario no encontrado o departamento no asignado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno del servidor");
        }
    }







    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody Employee e) {
        return employeeService.save(e);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Employee e, @PathVariable("id") long id) {
        return employeeService.update(e, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") long id) {
        return employeeService.deleteById(id);
    }
}
