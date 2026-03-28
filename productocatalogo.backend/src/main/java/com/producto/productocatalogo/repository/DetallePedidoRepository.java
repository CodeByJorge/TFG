package com.producto.productocatalogo.repository;

import com.producto.productocatalogo.dto.TopProductoDTO;
import com.producto.productocatalogo.model.DetallePedido;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {

    @Query("SELECT new com.producto.productocatalogo.dto.TopProductoDTO(" +
           "dp.producto.id, dp.producto.nombre, SUM(dp.cantidad)) " +
           "FROM DetallePedido dp " +
           "GROUP BY dp.producto.id, dp.producto.nombre " +
           "ORDER BY SUM(dp.cantidad) DESC")
    List<TopProductoDTO> findTopProductosMasVendidos(Pageable pageable);
}
