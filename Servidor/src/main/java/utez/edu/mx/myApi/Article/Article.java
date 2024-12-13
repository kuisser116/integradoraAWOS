package utez.edu.mx.myApi.Article;

import jakarta.persistence.*;
import utez.edu.mx.myApi.Category.Category;
import utez.edu.mx.myApi.department.Department;

import java.util.List;

@Entity
@Table(name = "article")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_category", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "id_department", nullable = false)  // Nueva columna para el departamento
    private Department department;

    @ManyToMany(mappedBy = "articles")
    private List<Department> departments;

    public Article() {
    }

    public Article(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Article(String name, String description, Category category, List<Department> departments) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.departments = departments;
    }

    public Article(long id, String name, String description, Category category, List<Department> departments) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.departments = departments;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }
}
