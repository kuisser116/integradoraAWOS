package utez.edu.mx.myApi.department;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.myApi.Article.Article;

@RestController
@RequestMapping("/api/department")
@CrossOrigin(origins = {"*"})
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return departmentService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") long id) {
        return departmentService.findById(id);
    }

    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody Department department) {
        return departmentService.save(department);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Department department, @PathVariable("id") long id) {
        return departmentService.update(department, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") long id) {
        return departmentService.deleteById(id);
    }


}
