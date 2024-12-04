package utez.edu.mx.myApi.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
