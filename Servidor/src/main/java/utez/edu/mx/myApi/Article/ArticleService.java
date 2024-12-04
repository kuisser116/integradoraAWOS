package utez.edu.mx.myApi.Article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll() {
        Map<String, Object> body = new HashMap<>();
        List<Article> list = articleRepository.findAll();

        body.put("message", list.isEmpty() ? "Aún no hay registros" : "Operación exitosa");
        body.put("status", "OK");
        body.put("code", 200);
        body.put("data", list);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(long id) {
        Map<String, Object> body = new HashMap<>();
        Article found = articleRepository.findById(id);

        body.put("message", found == null ? "El registro no existe" : "Operación exitosa");
        body.put("status", found == null ? "NOT_FOUND" : "OK");
        body.put("code", found == null ? 404 : 200);
        body.put("data", found);
        return new ResponseEntity<>(body, found == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> save(Article article) {
        Map<String, Object> body = new HashMap<>();
        Article saved = null;
        try {
            saved = articleRepository.save(article);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }

        body.put("message", saved == null ? "No se registró la información" : "Operación exitosa");
        body.put("status", saved == null ? "BAD_REQUEST" : "OK");
        body.put("code", saved == null ? 400 : 200);
        body.put("data", saved == null ? null : saved.getId());
        return new ResponseEntity<>(body, saved == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> update(Article article, long id) {
        Map<String, Object> body = new HashMap<>();
        Article updated = null;
        if(articleRepository.findById(id) != null) {
            article.setId(id);
            try {
                updated = articleRepository.save(article);
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println(e.getMessage());
            }

            body.put("message", updated == null ? "No se registró la información" : "Operación exitosa");
            body.put("status", updated == null ? "BAD_REQUEST" : "OK");
            body.put("code", updated == null ? 400 : 200);
            return new ResponseEntity<>(body, updated == null ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
        } else {
            body.put("message", "No se encontró el registro");
            body.put("status", "NOT_FOUND");
            body.put("code", 404);
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ResponseEntity<?> deleteById(long id) {
        Map<String, Object> body = new HashMap<>();
        HttpStatus status = null;
        if(articleRepository.findById(id) != null) {
            try {
                articleRepository.deleteById(id);

                body.put("message", "Operación exitosa");
                body.put("status", "OK");
                body.put("code", 200);
                status = HttpStatus.OK;
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println(e.getMessage());

                body.put("message", "No se realizó la eliminación");
                body.put("status", "BAD_REQUEST");
                body.put("code", 400);
                status = HttpStatus.BAD_REQUEST;
            }
        } else {
            body.put("message", "No se encontró el registro");
            body.put("status", "NOT_FOUND");
            body.put("code", 404);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(body, status);
    }
}
