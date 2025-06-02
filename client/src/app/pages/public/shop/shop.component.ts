import { Component } from '@angular/core';
import { ProductsCardsComponent } from "../components/products-cards/products-cards.component";
import { CommonModule } from '@angular/common';
import { ProductModalComponent } from "../components/product-modal/product-modal.component";
import { Ipublishing } from '../interfaces/Ipublishing';


@Component({
  selector: 'app-shop',
  imports: [CommonModule, ProductsCardsComponent, ProductModalComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  onModal: boolean = false
  currentPublishing: any;

  showModal(event: boolean) {
    if (event) {
      this.onModal = true;
    }
    else {
      this.onModal = false;
      this.currentPublishing = null
    }
  }

  opdenModal(event: Ipublishing) {
    this.currentPublishing = event
    this.showModal(true)
  }

  listPublishing = [
    {
      id: 1,
      title: 'Camiseta deportiva original',
      article: 'Camiseta de fútbol marca Adidas, talla M, en excelente estado.',
      type: 1,
      price: 150,
      seller: {
        id: 1,
        user: {
          id: 1,
          email: 'juanperez@example.com',
          name: 'Juan',
          lastname: 'Pérez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 101,
        direction: 'Av. Central #123',
        phone: '5551234567',
        score: 4.8
      },
      img: 'https://picsum.photos/seed/p1/400/300'
    },
    {
      id: 2,
      title: 'Laptop Lenovo IdeaPad',
      article: 'Laptop Lenovo con 8GB RAM, SSD de 256GB, pantalla 14". Poco uso.',
      type: 2,
      price: 2200,
      seller: {
        id: 2,
        user: {
          id: 2,
          email: 'mariagomez@example.com',
          name: 'María',
          lastname: 'Gómez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 202,
        direction: 'Calle 45 #456',
        phone: '5559876543',
        score: 4.5
      },
      img: 'https://picsum.photos/seed/p2/400/300'
    },
    {
      id: 3,
      title: 'Bicicleta montaña',
      article: 'Bicicleta rodada 29, suspensión delantera, frenos de disco.',
      type: 3,
      price: 1800,
      seller: {
        id: 3,
        user: {
          id: 3,
          email: 'carlosruiz@example.com',
          name: 'Carlos',
          lastname: 'Ruiz',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 303,
        direction: 'Boulevard Bicentenario #321',
        phone: '5553217890',
        score: 4.9
      },
      img: 'https://picsum.photos/seed/p3/400/300'
    },
    {
      id: 4,
      title: 'iPhone 13 128GB',
      article: 'iPhone 13 color negro, 128GB, libre de fábrica. Incluye cargador.',
      type: 4,
      price: 9500,
      seller: {
        id: 4,
        user: {
          id: 4,
          email: 'luisafernandez@example.com',
          name: 'Luisa',
          lastname: 'Fernández',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 404,
        direction: 'Col. Jardines del Sur #88',
        phone: '5556543210',
        score: 4.7
      },
      img: 'https://picsum.photos/seed/p4/400/300'
    },
    {
      id: 5,
      title: 'Libro "El poder del hábito"',
      article: 'Edición en español, en excelente estado, tapa blanda.',
      type: 5,
      price: 250,
      seller: {
        id: 5,
        user: {
          id: 5,
          email: 'roberto@example.com',
          name: 'Roberto',
          lastname: 'Mendoza',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 505,
        direction: 'Av. de los Libros #12',
        phone: '5550001122',
        score: 4.2
      },
      img: 'https://picsum.photos/seed/p5/400/300'
    },
    {
      id: 6,
      title: 'Smartwatch Xiaomi Mi Band 7',
      article: 'Reloj inteligente con monitoreo de ritmo cardíaco y sueño.',
      type: 1,
      price: 600,
      seller: {
        id: 6,
        user: {
          id: 6,
          email: 'ana@example.com',
          name: 'Ana',
          lastname: 'Lopez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 606,
        direction: 'Av. Reforma #789',
        phone: '5553332222',
        score: 4.6
      },
      img: 'https://picsum.photos/seed/p6/400/300'
    },
    {
      id: 7,
      title: 'Audífonos inalámbricos Sony',
      article: 'Cancelación de ruido, excelente calidad de sonido.',
      type: 2,
      price: 1200,
      seller: {
        id: 7,
        user: {
          id: 7,
          email: 'martin@example.com',
          name: 'Martín',
          lastname: 'Santos',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 707,
        direction: 'Zona Centro #111',
        phone: '5554445566',
        score: 4.4
      },
      img: 'https://picsum.photos/seed/p7/400/300'
    },
    {
      id: 8,
      title: 'Silla ergonómica de oficina',
      article: 'Con respaldo lumbar y apoyabrazos ajustables.',
      type: 3,
      price: 3200,
      seller: {
        id: 8,
        user: {
          id: 8,
          email: 'sofia@example.com',
          name: 'Sofía',
          lastname: 'Ramírez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 808,
        direction: 'Calle del Trabajo #222',
        phone: '5558887788',
        score: 4.3
      },
      img: 'https://picsum.photos/seed/p8/400/300'
    },
    {
      id: 9,
      title: 'Teclado mecánico retroiluminado',
      article: 'Switches azules, ideal para gaming y escritura.',
      type: 4,
      price: 980,
      seller: {
        id: 9,
        user: {
          id: 9,
          email: 'luis@example.com',
          name: 'Luis',
          lastname: 'Mora',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 909,
        direction: 'Col. Los Pinos #23',
        phone: '5557778899',
        score: 4.1
      },
      img: 'https://picsum.photos/seed/p9/400/300'
    },
    {
      id: 10,
      title: 'Mochila impermeable',
      article: 'Ideal para laptop y viajes. Varios compartimentos.',
      type: 5,
      price: 540,
      seller: {
        id: 10,
        user: {
          id: 10,
          email: 'fernanda@example.com',
          name: 'Fernanda',
          lastname: 'Navarro',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1010,
        direction: 'Circuito del Sol #66',
        phone: '5552233445',
        score: 4.0
      },
      img: 'https://picsum.photos/seed/p10/400/300'
    },
    {
      id: 11,
      title: 'Set de ollas de acero inoxidable',
      article: '5 piezas, aptas para inducción y lavavajillas.',
      type: 6,
      price: 1800,
      seller: {
        id: 11,
        user: {
          id: 11,
          email: 'paola@example.com',
          name: 'Paola',
          lastname: 'Delgado',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1111,
        direction: 'Av. Cocina Feliz #7',
        phone: '5553344556',
        score: 4.6
      },
      img: 'https://picsum.photos/seed/p11/400/300'
    },
    {
      id: 12,
      title: 'Tablet Samsung Galaxy Tab A8',
      article: 'Pantalla de 10.5", 64GB, color grafito. Ideal para estudiar.',
      type: 7,
      price: 3600,
      seller: {
        id: 12,
        user: {
          id: 12,
          email: 'ricardo@example.com',
          name: 'Ricardo',
          lastname: 'Castañeda',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1212,
        direction: 'Paseo Digital #101',
        phone: '5551122334',
        score: 4.5
      },
      img: 'https://picsum.photos/seed/p12/400/300'
    },
    {
      id: 1,
      title: 'Camiseta deportiva original',
      article: 'Camiseta de fútbol marca Adidas, talla M, en excelente estado.',
      type: 1,
      price: 150,
      seller: {
        id: 1,
        user: {
          id: 1,
          email: 'juanperez@example.com',
          name: 'Juan',
          lastname: 'Pérez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 101,
        direction: 'Av. Central #123',
        phone: '5551234567',
        score: 4.8
      },
      img: 'https://picsum.photos/seed/p1/400/300'
    },
    {
      id: 2,
      title: 'Laptop Lenovo IdeaPad',
      article: 'Laptop Lenovo con 8GB RAM, SSD de 256GB, pantalla 14". Poco uso.',
      type: 2,
      price: 2200,
      seller: {
        id: 2,
        user: {
          id: 2,
          email: 'mariagomez@example.com',
          name: 'María',
          lastname: 'Gómez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 202,
        direction: 'Calle 45 #456',
        phone: '5559876543',
        score: 4.5
      },
      img: 'https://picsum.photos/seed/p2/400/300'
    },
    {
      id: 3,
      title: 'Bicicleta montaña',
      article: 'Bicicleta rodada 29, suspensión delantera, frenos de disco.',
      type: 3,
      price: 1800,
      seller: {
        id: 3,
        user: {
          id: 3,
          email: 'carlosruiz@example.com',
          name: 'Carlos',
          lastname: 'Ruiz',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 303,
        direction: 'Boulevard Bicentenario #321',
        phone: '5553217890',
        score: 4.9
      },
      img: 'https://picsum.photos/seed/p3/400/300'
    },
    {
      id: 4,
      title: 'iPhone 13 128GB',
      article: 'iPhone 13 color negro, 128GB, libre de fábrica. Incluye cargador.',
      type: 4,
      price: 9500,
      seller: {
        id: 4,
        user: {
          id: 4,
          email: 'luisafernandez@example.com',
          name: 'Luisa',
          lastname: 'Fernández',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 404,
        direction: 'Col. Jardines del Sur #88',
        phone: '5556543210',
        score: 4.7
      },
      img: 'https://picsum.photos/seed/p4/400/300'
    },
    {
      id: 5,
      title: 'Libro "El poder del hábito"',
      article: 'Edición en español, en excelente estado, tapa blanda.',
      type: 5,
      price: 250,
      seller: {
        id: 5,
        user: {
          id: 5,
          email: 'roberto@example.com',
          name: 'Roberto',
          lastname: 'Mendoza',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 505,
        direction: 'Av. de los Libros #12',
        phone: '5550001122',
        score: 4.2
      },
      img: 'https://picsum.photos/seed/p5/400/300'
    },
    {
      id: 6,
      title: 'Smartwatch Xiaomi Mi Band 7',
      article: 'Reloj inteligente con monitoreo de ritmo cardíaco y sueño.',
      type: 1,
      price: 600,
      seller: {
        id: 6,
        user: {
          id: 6,
          email: 'ana@example.com',
          name: 'Ana',
          lastname: 'Lopez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 606,
        direction: 'Av. Reforma #789',
        phone: '5553332222',
        score: 4.6
      },
      img: 'https://picsum.photos/seed/p6/400/300'
    },
    {
      id: 7,
      title: 'Audífonos inalámbricos Sony',
      article: 'Cancelación de ruido, excelente calidad de sonido.',
      type: 2,
      price: 1200,
      seller: {
        id: 7,
        user: {
          id: 7,
          email: 'martin@example.com',
          name: 'Martín',
          lastname: 'Santos',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 707,
        direction: 'Zona Centro #111',
        phone: '5554445566',
        score: 4.4
      },
      img: 'https://picsum.photos/seed/p7/400/300'
    },
    {
      id: 8,
      title: 'Silla ergonómica de oficina',
      article: 'Con respaldo lumbar y apoyabrazos ajustables.',
      type: 3,
      price: 3200,
      seller: {
        id: 8,
        user: {
          id: 8,
          email: 'sofia@example.com',
          name: 'Sofía',
          lastname: 'Ramírez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 808,
        direction: 'Calle del Trabajo #222',
        phone: '5558887788',
        score: 4.3
      },
      img: 'https://picsum.photos/seed/p8/400/300'
    },
    {
      id: 9,
      title: 'Teclado mecánico retroiluminado',
      article: 'Switches azules, ideal para gaming y escritura.',
      type: 4,
      price: 980,
      seller: {
        id: 9,
        user: {
          id: 9,
          email: 'luis@example.com',
          name: 'Luis',
          lastname: 'Mora',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 909,
        direction: 'Col. Los Pinos #23',
        phone: '5557778899',
        score: 4.1
      },
      img: 'https://picsum.photos/seed/p9/400/300'
    },
    {
      id: 10,
      title: 'Mochila impermeable',
      article: 'Ideal para laptop y viajes. Varios compartimentos.',
      type: 5,
      price: 540,
      seller: {
        id: 10,
        user: {
          id: 10,
          email: 'fernanda@example.com',
          name: 'Fernanda',
          lastname: 'Navarro',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1010,
        direction: 'Circuito del Sol #66',
        phone: '5552233445',
        score: 4.0
      },
      img: 'https://picsum.photos/seed/p10/400/300'
    },
    {
      id: 11,
      title: 'Set de ollas de acero inoxidable',
      article: '5 piezas, aptas para inducción y lavavajillas.',
      type: 6,
      price: 1800,
      seller: {
        id: 11,
        user: {
          id: 11,
          email: 'paola@example.com',
          name: 'Paola',
          lastname: 'Delgado',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1111,
        direction: 'Av. Cocina Feliz #7',
        phone: '5553344556',
        score: 4.6
      },
      img: 'https://picsum.photos/seed/p11/400/300'
    },
    {
      id: 12,
      title: 'Tablet Samsung Galaxy Tab A8',
      article: 'Pantalla de 10.5", 64GB, color grafito. Ideal para estudiar.',
      type: 7,
      price: 3600,
      seller: {
        id: 12,
        user: {
          id: 12,
          email: 'ricardo@example.com',
          name: 'Ricardo',
          lastname: 'Castañeda',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1212,
        direction: 'Paseo Digital #101',
        phone: '5551122334',
        score: 4.5
      },
      img: 'https://picsum.photos/seed/p12/400/300'
    },
    {
      id: 1,
      title: 'Camiseta deportiva original',
      article: 'Camiseta de fútbol marca Adidas, talla M, en excelente estado.',
      type: 1,
      price: 150,
      seller: {
        id: 1,
        user: {
          id: 1,
          email: 'juanperez@example.com',
          name: 'Juan',
          lastname: 'Pérez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 101,
        direction: 'Av. Central #123',
        phone: '5551234567',
        score: 4.8
      },
      img: 'https://picsum.photos/seed/p1/400/300'
    },
    {
      id: 2,
      title: 'Laptop Lenovo IdeaPad',
      article: 'Laptop Lenovo con 8GB RAM, SSD de 256GB, pantalla 14". Poco uso.',
      type: 2,
      price: 2200,
      seller: {
        id: 2,
        user: {
          id: 2,
          email: 'mariagomez@example.com',
          name: 'María',
          lastname: 'Gómez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 202,
        direction: 'Calle 45 #456',
        phone: '5559876543',
        score: 4.5
      },
      img: 'https://picsum.photos/seed/p2/400/300'
    },
    {
      id: 3,
      title: 'Bicicleta montaña',
      article: 'Bicicleta rodada 29, suspensión delantera, frenos de disco.',
      type: 3,
      price: 1800,
      seller: {
        id: 3,
        user: {
          id: 3,
          email: 'carlosruiz@example.com',
          name: 'Carlos',
          lastname: 'Ruiz',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 303,
        direction: 'Boulevard Bicentenario #321',
        phone: '5553217890',
        score: 4.9
      },
      img: 'https://picsum.photos/seed/p3/400/300'
    },
    {
      id: 4,
      title: 'iPhone 13 128GB',
      article: 'iPhone 13 color negro, 128GB, libre de fábrica. Incluye cargador.',
      type: 4,
      price: 9500,
      seller: {
        id: 4,
        user: {
          id: 4,
          email: 'luisafernandez@example.com',
          name: 'Luisa',
          lastname: 'Fernández',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 404,
        direction: 'Col. Jardines del Sur #88',
        phone: '5556543210',
        score: 4.7
      },
      img: 'https://picsum.photos/seed/p4/400/300'
    },
    {
      id: 5,
      title: 'Libro "El poder del hábito"',
      article: 'Edición en español, en excelente estado, tapa blanda.',
      type: 5,
      price: 250,
      seller: {
        id: 5,
        user: {
          id: 5,
          email: 'roberto@example.com',
          name: 'Roberto',
          lastname: 'Mendoza',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 505,
        direction: 'Av. de los Libros #12',
        phone: '5550001122',
        score: 4.2
      },
      img: 'https://picsum.photos/seed/p5/400/300'
    },
    {
      id: 6,
      title: 'Smartwatch Xiaomi Mi Band 7',
      article: 'Reloj inteligente con monitoreo de ritmo cardíaco y sueño.',
      type: 1,
      price: 600,
      seller: {
        id: 6,
        user: {
          id: 6,
          email: 'ana@example.com',
          name: 'Ana',
          lastname: 'Lopez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 606,
        direction: 'Av. Reforma #789',
        phone: '5553332222',
        score: 4.6
      },
      img: 'https://picsum.photos/seed/p6/400/300'
    },
    {
      id: 7,
      title: 'Audífonos inalámbricos Sony',
      article: 'Cancelación de ruido, excelente calidad de sonido.',
      type: 2,
      price: 1200,
      seller: {
        id: 7,
        user: {
          id: 7,
          email: 'martin@example.com',
          name: 'Martín',
          lastname: 'Santos',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 707,
        direction: 'Zona Centro #111',
        phone: '5554445566',
        score: 4.4
      },
      img: 'https://picsum.photos/seed/p7/400/300'
    },
    {
      id: 8,
      title: 'Silla ergonómica de oficina',
      article: 'Con respaldo lumbar y apoyabrazos ajustables.',
      type: 3,
      price: 3200,
      seller: {
        id: 8,
        user: {
          id: 8,
          email: 'sofia@example.com',
          name: 'Sofía',
          lastname: 'Ramírez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 808,
        direction: 'Calle del Trabajo #222',
        phone: '5558887788',
        score: 4.3
      },
      img: 'https://picsum.photos/seed/p8/400/300'
    },
    {
      id: 9,
      title: 'Teclado mecánico retroiluminado',
      article: 'Switches azules, ideal para gaming y escritura.',
      type: 4,
      price: 980,
      seller: {
        id: 9,
        user: {
          id: 9,
          email: 'luis@example.com',
          name: 'Luis',
          lastname: 'Mora',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 909,
        direction: 'Col. Los Pinos #23',
        phone: '5557778899',
        score: 4.1
      },
      img: 'https://picsum.photos/seed/p9/400/300'
    },
    {
      id: 10,
      title: 'Mochila impermeable',
      article: 'Ideal para laptop y viajes. Varios compartimentos.',
      type: 5,
      price: 540,
      seller: {
        id: 10,
        user: {
          id: 10,
          email: 'fernanda@example.com',
          name: 'Fernanda',
          lastname: 'Navarro',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1010,
        direction: 'Circuito del Sol #66',
        phone: '5552233445',
        score: 4.0
      },
      img: 'https://picsum.photos/seed/p10/400/300'
    },
    {
      id: 11,
      title: 'Set de ollas de acero inoxidable',
      article: '5 piezas, aptas para inducción y lavavajillas.',
      type: 6,
      price: 1800,
      seller: {
        id: 11,
        user: {
          id: 11,
          email: 'paola@example.com',
          name: 'Paola',
          lastname: 'Delgado',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1111,
        direction: 'Av. Cocina Feliz #7',
        phone: '5553344556',
        score: 4.6
      },
      img: 'https://picsum.photos/seed/p11/400/300'
    },
    {
      id: 12,
      title: 'Tablet Samsung Galaxy Tab A8',
      article: 'Pantalla de 10.5", 64GB, color grafito. Ideal para estudiar.',
      type: 7,
      price: 3600,
      seller: {
        id: 12,
        user: {
          id: 12,
          email: 'ricardo@example.com',
          name: 'Ricardo',
          lastname: 'Castañeda',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1212,
        direction: 'Paseo Digital #101',
        phone: '5551122334',
        score: 4.5
      },
      img: 'https://picsum.photos/seed/p12/400/300'
    },
    {
      id: 1,
      title: 'Camiseta deportiva original',
      article: 'Camiseta de fútbol marca Adidas, talla M, en excelente estado.',
      type: 1,
      price: 150,
      seller: {
        id: 1,
        user: {
          id: 1,
          email: 'juanperez@example.com',
          name: 'Juan',
          lastname: 'Pérez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 101,
        direction: 'Av. Central #123',
        phone: '5551234567',
        score: 4.8
      },
      img: 'https://picsum.photos/seed/p1/400/300'
    },
    {
      id: 2,
      title: 'Laptop Lenovo IdeaPad',
      article: 'Laptop Lenovo con 8GB RAM, SSD de 256GB, pantalla 14". Poco uso.',
      type: 2,
      price: 2200,
      seller: {
        id: 2,
        user: {
          id: 2,
          email: 'mariagomez@example.com',
          name: 'María',
          lastname: 'Gómez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 202,
        direction: 'Calle 45 #456',
        phone: '5559876543',
        score: 4.5
      },
      img: 'https://picsum.photos/seed/p2/400/300'
    },
    {
      id: 3,
      title: 'Bicicleta montaña',
      article: 'Bicicleta rodada 29, suspensión delantera, frenos de disco.',
      type: 3,
      price: 1800,
      seller: {
        id: 3,
        user: {
          id: 3,
          email: 'carlosruiz@example.com',
          name: 'Carlos',
          lastname: 'Ruiz',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 303,
        direction: 'Boulevard Bicentenario #321',
        phone: '5553217890',
        score: 4.9
      },
      img: 'https://picsum.photos/seed/p3/400/300'
    },
    {
      id: 4,
      title: 'iPhone 13 128GB',
      article: 'iPhone 13 color negro, 128GB, libre de fábrica. Incluye cargador.',
      type: 4,
      price: 9500,
      seller: {
        id: 4,
        user: {
          id: 4,
          email: 'luisafernandez@example.com',
          name: 'Luisa',
          lastname: 'Fernández',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 404,
        direction: 'Col. Jardines del Sur #88',
        phone: '5556543210',
        score: 4.7
      },
      img: 'https://picsum.photos/seed/p4/400/300'
    },
    {
      id: 5,
      title: 'Libro "El poder del hábito"',
      article: 'Edición en español, en excelente estado, tapa blanda.',
      type: 5,
      price: 250,
      seller: {
        id: 5,
        user: {
          id: 5,
          email: 'roberto@example.com',
          name: 'Roberto',
          lastname: 'Mendoza',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 505,
        direction: 'Av. de los Libros #12',
        phone: '5550001122',
        score: 4.2
      },
      img: 'https://picsum.photos/seed/p5/400/300'
    },
    {
      id: 6,
      title: 'Smartwatch Xiaomi Mi Band 7',
      article: 'Reloj inteligente con monitoreo de ritmo cardíaco y sueño.',
      type: 1,
      price: 600,
      seller: {
        id: 6,
        user: {
          id: 6,
          email: 'ana@example.com',
          name: 'Ana',
          lastname: 'Lopez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 606,
        direction: 'Av. Reforma #789',
        phone: '5553332222',
        score: 4.6
      },
      img: 'https://picsum.photos/seed/p6/400/300'
    },
    {
      id: 7,
      title: 'Audífonos inalámbricos Sony',
      article: 'Cancelación de ruido, excelente calidad de sonido.',
      type: 2,
      price: 1200,
      seller: {
        id: 7,
        user: {
          id: 7,
          email: 'martin@example.com',
          name: 'Martín',
          lastname: 'Santos',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 707,
        direction: 'Zona Centro #111',
        phone: '5554445566',
        score: 4.4
      },
      img: 'https://picsum.photos/seed/p7/400/300'
    },
    {
      id: 8,
      title: 'Silla ergonómica de oficina',
      article: 'Con respaldo lumbar y apoyabrazos ajustables.',
      type: 3,
      price: 3200,
      seller: {
        id: 8,
        user: {
          id: 8,
          email: 'sofia@example.com',
          name: 'Sofía',
          lastname: 'Ramírez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 808,
        direction: 'Calle del Trabajo #222',
        phone: '5558887788',
        score: 4.3
      },
      img: 'https://picsum.photos/seed/p8/400/300'
    },
    {
      id: 9,
      title: 'Teclado mecánico retroiluminado',
      article: 'Switches azules, ideal para gaming y escritura.',
      type: 4,
      price: 980,
      seller: {
        id: 9,
        user: {
          id: 9,
          email: 'luis@example.com',
          name: 'Luis',
          lastname: 'Mora',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 909,
        direction: 'Col. Los Pinos #23',
        phone: '5557778899',
        score: 4.1
      },
      img: 'https://picsum.photos/seed/p9/400/300'
    },
    {
      id: 10,
      title: 'Mochila impermeable',
      article: 'Ideal para laptop y viajes. Varios compartimentos.',
      type: 5,
      price: 540,
      seller: {
        id: 10,
        user: {
          id: 10,
          email: 'fernanda@example.com',
          name: 'Fernanda',
          lastname: 'Navarro',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1010,
        direction: 'Circuito del Sol #66',
        phone: '5552233445',
        score: 4.0
      },
      img: 'https://picsum.photos/seed/p10/400/300'
    },
    {
      id: 11,
      title: 'Set de ollas de acero inoxidable',
      article: '5 piezas, aptas para inducción y lavavajillas.',
      type: 6,
      price: 1800,
      seller: {
        id: 11,
        user: {
          id: 11,
          email: 'paola@example.com',
          name: 'Paola',
          lastname: 'Delgado',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1111,
        direction: 'Av. Cocina Feliz #7',
        phone: '5553344556',
        score: 4.6
      },
      img: 'https://picsum.photos/seed/p11/400/300'
    },
    {
      id: 12,
      title: 'Tablet Samsung Galaxy Tab A8',
      article: 'Pantalla de 10.5", 64GB, color grafito. Ideal para estudiar.',
      type: 7,
      price: 3600,
      seller: {
        id: 12,
        user: {
          id: 12,
          email: 'ricardo@example.com',
          name: 'Ricardo',
          lastname: 'Castañeda',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1212,
        direction: 'Paseo Digital #101',
        phone: '5551122334',
        score: 4.5
      },
      img: 'https://picsum.photos/seed/p12/400/300'
    },
    {
      id: 1,
      title: 'Camiseta deportiva original',
      article: 'Camiseta de fútbol marca Adidas, talla M, en excelente estado.',
      type: 1,
      price: 150,
      seller: {
        id: 1,
        user: {
          id: 1,
          email: 'juanperez@example.com',
          name: 'Juan',
          lastname: 'Pérez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 101,
        direction: 'Av. Central #123',
        phone: '5551234567',
        score: 4.8
      },
      img: 'https://picsum.photos/seed/p1/400/300'
    },
    {
      id: 2,
      title: 'Laptop Lenovo IdeaPad',
      article: 'Laptop Lenovo con 8GB RAM, SSD de 256GB, pantalla 14". Poco uso.',
      type: 2,
      price: 2200,
      seller: {
        id: 2,
        user: {
          id: 2,
          email: 'mariagomez@example.com',
          name: 'María',
          lastname: 'Gómez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 202,
        direction: 'Calle 45 #456',
        phone: '5559876543',
        score: 4.5
      },
      img: 'https://picsum.photos/seed/p2/400/300'
    },
    {
      id: 3,
      title: 'Bicicleta montaña',
      article: 'Bicicleta rodada 29, suspensión delantera, frenos de disco.',
      type: 3,
      price: 1800,
      seller: {
        id: 3,
        user: {
          id: 3,
          email: 'carlosruiz@example.com',
          name: 'Carlos',
          lastname: 'Ruiz',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 303,
        direction: 'Boulevard Bicentenario #321',
        phone: '5553217890',
        score: 4.9
      },
      img: 'https://picsum.photos/seed/p3/400/300'
    },
    {
      id: 4,
      title: 'iPhone 13 128GB',
      article: 'iPhone 13 color negro, 128GB, libre de fábrica. Incluye cargador.',
      type: 4,
      price: 9500,
      seller: {
        id: 4,
        user: {
          id: 4,
          email: 'luisafernandez@example.com',
          name: 'Luisa',
          lastname: 'Fernández',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 404,
        direction: 'Col. Jardines del Sur #88',
        phone: '5556543210',
        score: 4.7
      },
      img: 'https://picsum.photos/seed/p4/400/300'
    },
    {
      id: 5,
      title: 'Libro "El poder del hábito"',
      article: 'Edición en español, en excelente estado, tapa blanda.',
      type: 5,
      price: 250,
      seller: {
        id: 5,
        user: {
          id: 5,
          email: 'roberto@example.com',
          name: 'Roberto',
          lastname: 'Mendoza',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 505,
        direction: 'Av. de los Libros #12',
        phone: '5550001122',
        score: 4.2
      },
      img: 'https://picsum.photos/seed/p5/400/300'
    },
    {
      id: 6,
      title: 'Smartwatch Xiaomi Mi Band 7',
      article: 'Reloj inteligente con monitoreo de ritmo cardíaco y sueño.',
      type: 1,
      price: 600,
      seller: {
        id: 6,
        user: {
          id: 6,
          email: 'ana@example.com',
          name: 'Ana',
          lastname: 'Lopez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 606,
        direction: 'Av. Reforma #789',
        phone: '5553332222',
        score: 4.6
      },
      img: 'https://picsum.photos/seed/p6/400/300'
    },
    {
      id: 7,
      title: 'Audífonos inalámbricos Sony',
      article: 'Cancelación de ruido, excelente calidad de sonido.',
      type: 2,
      price: 1200,
      seller: {
        id: 7,
        user: {
          id: 7,
          email: 'martin@example.com',
          name: 'Martín',
          lastname: 'Santos',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 707,
        direction: 'Zona Centro #111',
        phone: '5554445566',
        score: 4.4
      },
      img: 'https://picsum.photos/seed/p7/400/300'
    },
    {
      id: 8,
      title: 'Silla ergonómica de oficina',
      article: 'Con respaldo lumbar y apoyabrazos ajustables.',
      type: 3,
      price: 3200,
      seller: {
        id: 8,
        user: {
          id: 8,
          email: 'sofia@example.com',
          name: 'Sofía',
          lastname: 'Ramírez',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 808,
        direction: 'Calle del Trabajo #222',
        phone: '5558887788',
        score: 4.3
      },
      img: 'https://picsum.photos/seed/p8/400/300'
    },
    {
      id: 9,
      title: 'Teclado mecánico retroiluminado',
      article: 'Switches azules, ideal para gaming y escritura.',
      type: 4,
      price: 980,
      seller: {
        id: 9,
        user: {
          id: 9,
          email: 'luis@example.com',
          name: 'Luis',
          lastname: 'Mora',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 909,
        direction: 'Col. Los Pinos #23',
        phone: '5557778899',
        score: 4.1
      },
      img: 'https://picsum.photos/seed/p9/400/300'
    },
    {
      id: 10,
      title: 'Mochila impermeable',
      article: 'Ideal para laptop y viajes. Varios compartimentos.',
      type: 5,
      price: 540,
      seller: {
        id: 10,
        user: {
          id: 10,
          email: 'fernanda@example.com',
          name: 'Fernanda',
          lastname: 'Navarro',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1010,
        direction: 'Circuito del Sol #66',
        phone: '5552233445',
        score: 4.0
      },
      img: 'https://picsum.photos/seed/p10/400/300'
    },
    {
      id: 11,
      title: 'Set de ollas de acero inoxidable',
      article: '5 piezas, aptas para inducción y lavavajillas.',
      type: 6,
      price: 1800,
      seller: {
        id: 11,
        user: {
          id: 11,
          email: 'paola@example.com',
          name: 'Paola',
          lastname: 'Delgado',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1111,
        direction: 'Av. Cocina Feliz #7',
        phone: '5553344556',
        score: 4.6
      },
      img: 'https://picsum.photos/seed/p11/400/300'
    },
    {
      id: 12,
      title: 'Tablet Samsung Galaxy Tab A8',
      article: 'Pantalla de 10.5", 64GB, color grafito. Ideal para estudiar.',
      type: 7,
      price: 3600,
      seller: {
        id: 12,
        user: {
          id: 12,
          email: 'ricardo@example.com',
          name: 'Ricardo',
          lastname: 'Castañeda',
          create_at: new Date(),
          update_at: new Date()
        },
        municipio_id: 1212,
        direction: 'Paseo Digital #101',
        phone: '5551122334',
        score: 4.5
      },
      img: 'https://picsum.photos/seed/p12/400/300'
    }
  ];

}
