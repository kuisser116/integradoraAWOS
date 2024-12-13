package utez.edu.mx.myApi.Article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/article")
@CrossOrigin(origins = {"*"})
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return articleService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") long id) {
        return articleService.findById(id);
    }

    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody Article a) {
        return articleService.save(a);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Article a, @PathVariable("id") long id) {
        return articleService.update(a, id);
    }





    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") long id) {
        return articleService.deleteById(id);
    }


}
