package com.producto.productocatalogo.controller;

import com.producto.productocatalogo.Service.UsuarioService;
import com.producto.productocatalogo.model.Usuario;
import com.producto.productocatalogo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class UsuarioController {
    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");

            logger.info("=== INICIO DE INTENTO DE LOGIN ===");
            logger.info("Email recibido: {}", email);

            if (email == null || password == null) {
                logger.error("Email o password nulos");
                return ResponseEntity.badRequest().body(Map.of("error", "Email y contraseña son requeridos"));
            }

            Optional<Usuario> usuarioOpt = usuarioService.getUsuarioByEmail(email);
            
            if (usuarioOpt.isEmpty()) {
                logger.error("Usuario no encontrado para email: {}", email);
                return ResponseEntity.badRequest().body(Map.of("error", "Credenciales inválidas"));
            }

            Usuario usuario = usuarioOpt.get();
            logger.info("Usuario encontrado en BD:");
            logger.info("ID: {}", usuario.getId());
            logger.info("Email: {}", usuario.getEmail());
            logger.info("Rol: {}", usuario.getRol());
            
            boolean passwordMatches = passwordEncoder.matches(password, usuario.getPassword());
            logger.info("¿Contraseña coincide?: {}", passwordMatches);
            
            if (!passwordMatches) {
                logger.error("La contraseña no coincide");
                return ResponseEntity.badRequest().body(Map.of("error", "Credenciales inválidas"));
            }

            String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getRol());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("id", usuario.getId());
            response.put("nombre", usuario.getNombre());
            response.put("email", usuario.getEmail());
            response.put("rol", usuario.getRol());
            
            logger.info("Login exitoso para usuario: {}", email);
            logger.info("=== FIN DE INTENTO DE LOGIN ===");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error en login: ", e);
            return ResponseEntity.badRequest().body(Map.of("error", "Error en el servidor"));
        }
    }

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable String email) {
        return usuarioService.getUsuarioByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.createUsuario(usuario);
            return ResponseEntity.ok(nuevoUsuario);
        } catch (RuntimeException e) {
            logger.error("Error al crear usuario: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        try {
            Usuario usuarioActualizado = usuarioService.updateUsuario(id, usuario);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        try {
            usuarioService.deleteUsuario(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 
