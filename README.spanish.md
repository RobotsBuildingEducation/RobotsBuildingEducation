### ¡Bienvenido a Github!
Github es una plataforma que permite a los desarrolladores de software colaborar con código. Piensa en ello como Google Docs, pero para ingenieros de software. Aprenderemos más sobre el uso de Git y Github en otro momento, pero por ahora esto sirve como una cálida bienvenida al mundo de la construcción de software.

### Consejos
Es importante recordar esto como principiante:

1. Construir cosas con software se trata principalmente de organizar información más que de ser bueno en matemáticas. Los lenguajes de programación usan lógica y computación para expresar ideas en lugar de ecuaciones y álgebra.

2. Al igual que el idioma español, puedes expresar las mismas ideas de muchas maneras diferentes.

3. Cuando algo te desafíe, falla más rápido y divide el problema en pasos más comprensibles.

### Exposición
La idea aquí es exponerte a conceptos antes de que empieces a responder preguntas sobre ellos en la aplicación, para que no te sientas intimidado más tarde. No te preocupes por no entender todo. De hecho, intenta hacer sentido de ello a simple vista o usa la IA a tu favor para crear una comprensión.

### Código

Observemos estas listas. Podemos ver que:
- `mis_datos_personalizados && mi_lista_personalizada` son equivalentes.
- `conjunto_de_datos && objeto_de_datos` también son fundamentalmente equivalentes.

```javascript
let mis_datos_personalizados = [
  1, 2, 3, 'a', 'b', 'c', null, false
]
const mi_lista_personalizada = new Array(
  1, 2, 3, 'a', 'b', 'c', null, false
)
mis_datos_personalizados.push('nuevo dato')
mi_lista_personalizada.push('nuevo dato')

let conjunto_de_datos = {
  introduccion: "Bienvenido",
  titulo: "Capítulo 1",
  esta_activo: true
}
conjunto_de_datos.pagina = 4
conjunto_de_datos['libro'] = 'Programación'

let objeto_de_datos = new Object()
objeto_de_datos.introduccion = 'Bienvenido'
objeto_de_datos.titulo = 'Capítulo 1'
objeto_de_datos.esta_activo = true
objeto_de_datos.pagina = 4
objeto_de_datos['libro'] = 'Programación'
```

Además, en el ejemplo anterior estamos expuestos a definiciones de variables, tipos de datos, arreglos, funciones y objetos. Gran parte del software que escribas probablemente operará con estos conceptos en su núcleo. Así es como `[]` y `new Array` pueden crear los mismos datos: se traduce de la misma manera cuando se trata de convertir tu código en señales que pueden enviarse a través de internet.

En el ejemplo a continuación, observamos cómo crear nuestros propios objetos personalizados. Creamos un objeto personalizado, junto con una interfaz de funciones. Generalmente, cuando se trata de datos, puedes crearlos, recuperarlos, actualizarlos o eliminarlos de alguna forma.

```javascript
class Casa {
  pintura_casa = null

  constructor(pintura) {
    this.pintura_casa = pintura
  }

  obtenerPintura() {
    return this.pintura_casa
  }

  establecerPintura = (pintura) => {
    this.pintura_casa = pintura
  }

  eliminarPintura = () => {
    this.pintura_casa = null
  }
}

let primera_casa = new Casa(
  "rosa"
)

let siguiente_casa = new Casa(
  "azul"
)

// devuelve el valor "rosa"
let pintura_primera =
  primera_casa.obtenerPintura()

// devuelve el valor "azul"
let pintura_siguiente =
  siguiente_casa.pintura_casa

// sigue devolviendo el valor "azul"
pintura_siguiente =
  siguiente_casa['pintura_casa']
```

Entonces, esto es crear datos y trabajar con datos. Verás que puedes combinar ideas según lo que necesites crear. Por ejemplo, el componente anterior también se puede escribir de la siguiente manera:

```javascript
function crearCasa(pintura = null) {
  return {
    pintura_casa: pintura,

    obtenerPintura() {
      return this.pintura_casa;
    },

    establecerPintura(pintura) {
      this.pintura_casa = pintura;
    },

    eliminarPintura() {
      this.pintura_casa = null;
    },
  };
}

// ¿Cuál es el valor del resultado?
const miCasa = crearCasa('azul');
let pintura = miCasa.pintura_casa;

miCasa.pintura_casa = 'roja';
pintura = miCasa.obtenerPintura()

miCasa.establecerPintura('verde');
pintura = miCasa.pintura_casa

miCasa.eliminarPintura();

let resultado = miCasa['pintura_casa']
```

Finalmente, combinamos esto para trabajar con un código que renderiza la siguiente pantalla:

```jsx
const MensajeCelebracion = ({
  nombre
}) => {
  const datos_estilo = {
    textAlign: 'center'
  }
  
  return (
    <div
      style={
        datos_estilo
      }
    >
      {nombre}
    </div>
  )
}

const Aplicacion = () => {
  return (
    <section
      style={{
        border: '3px solid black'
      }}
    >
      <header>
        <h2>¡Buen trabajo!</h2>
      </header>
      
      <MensajeCelebracion
        nombre="¡Creaste una pequeña aplicación!"
      />
     </section>
  )
}
```

---

### Conclusión
Recuerda que fallar más rápido está en tu mejor interés al aprender nuevas habilidades de software. Este documento de una página estará disponible dentro de la aplicación. También hay muchas otras funciones para ayudar en tu camino, pero dejaré eso a tu exploración de la plataforma y todo lo que tiene para ofrecer.

Mantente enfocado y ¡mucha suerte con el resto! 🌟
