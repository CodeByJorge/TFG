package com.producto.productocatalogo.Service;

import com.producto.productocatalogo.model.Usuario;
import com.producto.productocatalogo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class UsuarioService {
    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> getUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Usuario createUsuario(Usuario usuario) {
        logger.info("=== CREANDO NUEVO USUARIO ===");
        logger.info("Email: {}", usuario.getEmail());
        
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            logger.error("El email ya está registrado: {}", usuario.getEmail());
            throw new RuntimeException("El email ya está registrado");
        }
        
        String encodedPassword = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(encodedPassword);
        
        Usuario savedUsuario = usuarioRepository.save(usuario);
        logger.info("Usuario creado exitosamente con ID: {}", savedUsuario.getId());
        logger.info("=== FIN DE CREACIÓN DE USUARIO ===");
        return savedUsuario;
    }

    public Usuario updateUsuario(Long id, Usuario usuarioDetails) {
        logger.info("=== ACTUALIZANDO USUARIO ===");
        logger.info("ID del usuario: {}", id);
        
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setNombre(usuarioDetails.getNombre());
                    usuario.setEmail(usuarioDetails.getEmail());
                    if (usuarioDetails.getPassword() != null && !usuarioDetails.getPassword().isEmpty()) {
                        logger.info("Actualizando contraseña");
                        String encodedPassword = passwordEncoder.encode(usuarioDetails.getPassword());
                        usuario.setPassword(encodedPassword);
                    }
                    Usuario updatedUsuario = usuarioRepository.save(usuario);
                    logger.info("Usuario actualizado exitosamente");
                    logger.info("=== FIN DE ACTUALIZACIÓN DE USUARIO ===");
                    return updatedUsuario;
                })
                .orElseThrow(() -> {
                    logger.error("Usuario no encontrado con ID: {}", id);
                    return new RuntimeException("Usuario no encontrado");
                });
    }

    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public void deleteUsuariosByFecha(String fecha) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        LocalDateTime fechaLimite = LocalDateTime.parse(fecha, formatter);
        List<Usuario> usuarios = usuarioRepository.findAll();
        for (Usuario usuario : usuarios) {
            if (usuario.getFechaModificacion() != null && usuario.getFechaModificacion().isAfter(fechaLimite)) {
                usuarioRepository.delete(usuario);
            }
        }
    }

    public void deleteUsuariosByRol(String rol) {
        List<Usuario> usuarios = usuarioRepository.findAll();
        for (Usuario usuario : usuarios) {
            if (usuario.getRol() != null && usuario.getRol().equalsIgnoreCase(rol)) {
                usuarioRepository.delete(usuario);
            }
        }
    }

    public void deleteUsuariosInactivos() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        for (Usuario usuario : usuarios) {
            if (usuario.getActivo() != null && !usuario.getActivo()) {
                usuarioRepository.delete(usuario);
            }
        }
    }
} 
