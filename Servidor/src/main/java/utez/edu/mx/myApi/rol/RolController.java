package utez.edu.mx.myApi.rol;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rol")
@CrossOrigin(origins = {"*"})
public class RolController {
    @Autowired
    private RolService rolService;

    @GetMapping("")
    public ResponseEntity<?> findAll() {return  rolService.findAll();}
}
