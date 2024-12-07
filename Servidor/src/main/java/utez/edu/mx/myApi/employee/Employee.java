package utez.edu.mx.myApi.employee;

import jakarta.persistence.*;
import utez.edu.mx.myApi.department.Department;
import utez.edu.mx.myApi.rol.Rol;

import java.time.LocalDateTime;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "user", nullable = false)
    private String user;

    @Column(name = "password", nullable = true)
    private String password;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "e_mail", nullable = false)
    private String eMail;

    @ManyToOne
    @JoinColumn(name = "id_department", nullable = false)
    private Department department;

    @ManyToOne
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rol;

    @Column(name = "reset_token")
    private String resetToken; // Token para restablecimiento de contraseña

    @Column(name = "token_expiry_date")
    private LocalDateTime tokenExpiryDate; // Fecha de expiración del token


    public Employee() {
    }

    public Employee(String user, String password, String fullName, String eMail, String resetToken, LocalDateTime tokenExpiryDate) {
        this.user = user;
        this.password = password;
        this.fullName = fullName;
        this.eMail = eMail;
        this.resetToken = resetToken;
        this.tokenExpiryDate = tokenExpiryDate;
    }

    public Employee(String user, String password, String fullName, String eMail, Department department, Rol rol, String resetToken, LocalDateTime tokenExpiryDate) {
        this.user = user;
        this.password = password;
        this.fullName = fullName;
        this.eMail = eMail;
        this.department = department;
        this.rol = rol;
        this.resetToken = resetToken;
        this.tokenExpiryDate = tokenExpiryDate;
    }

    public Employee(long id, String user, String password, String fullName, String eMail, Department department, Rol rol, String resetToken, LocalDateTime tokenExpiryDate) {
        this.id = id;
        this.user = user;
        this.password = password;
        this.fullName = fullName;
        this.eMail = eMail;
        this.department = department;
        this.rol = rol;
        this.resetToken = resetToken;
        this.tokenExpiryDate = tokenExpiryDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public LocalDateTime getTokenExpiryDate() {
        return tokenExpiryDate;
    }

    public void setTokenExpiryDate(LocalDateTime tokenExpiryDate) {
        this.tokenExpiryDate = tokenExpiryDate;
    }
}
