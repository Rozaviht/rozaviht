import prisma from "lib/prisma"

const getCategoriesId = async () => {
  const categories = await prisma.article_categories.findMany()

  const categoriesId: string[] = []
  
  for(let i=0; i < categories.length -1; i++) {
    categoriesId[i] = categories[i].id
  }

  return categoriesId
}

const IDsData = getCategoriesId()

export const articlesCategories = [
  {
    "name": "CBD"
  },
  {
    "name": "Ecologismo"
  }
]

export const articles = [
    {
      "title": "Beneficios del CBD",
      "content": "Sabiendo ya que es el CBD podemos ver que este producto, cuenta con muchos beneficios los cuales, ayudan a nuestro cuerpo de forma positiva. ya que no produce ningún efecto psicoactivo (no droga), en nuestro organismo, Hemos escuchado o leído que este producto cuenta con muchos beneficios, o a lo mejor desconocemos este dato, para ello y no hacerte mas larga la historia te mencionaremos 5 de ellos, los cuales son los más importantes del CBD que te pueden ayudar en tu día a día si consumes este producto, cabe recalcar que no es un sustituyente farmacéutico, pero tampoco afectaría tu sistema orgánico. Estos son.: analgésico, antiinflamatorio, ansiolítico, antidepresivo, y anti convulsionante.",
      "categoryId": IDsData[0]
    },
    {
      "title": "¿Qué es el CBD?",
      "content": "El CBD o cannabidiol, es uno de los principales componentes del Cannabis. El cual proviene de la flor resinosa. El CBD es de la planta del CANNABIS SATIVA L, la cual contiene más de 500 compuestos activos (terpenos,falvonoides y más de 120 cannabinoides.). por lo cual el CBD es una de estas moléculas,  exactamente proviene de LA FLOR DE LA PLANTA. El cbd es el segundo compuesto más abundante en el cáñamo. La importancia de este es que no es ni psicoactivo, ni adictivo, y mucho menos tóxico. La mayoría de las personas al escuchar o leer CBD ya directamente hacen referencia o asocian el CBD con la marihuana, pero no es el caso, por otra parte este producto aporta diferentes beneficios al organismo en  manera positiva, pero de ellos te hablaremos en otro apartado.",
      "categoryId": getCategoriesId(0)
    },
    {
      "title": "Maneras de reciclar en tu día a día",
      "content": "Existen diferentes maneras de RECICLAJE, las más comunes como ya sabemos es el separar lo orgánico de lo inorgánico. Podemos encontrar diversas formas de reciclar, nosotros te mencionamos algunas de ellas para que puedas ponerlas en práctica, ponemos iniciar separando el papel, cristales, plástico, de la materia orgánica, cáscaras de fruta, verduras comida etc. Como también podemos generar composta de todos los residuos orgánicos que acumulemos. Reutilizar los productos, dándoles diferentes usos ya sea en nuestro hogar o lugar de trabajo, llevando o tirando de manera correcta en su sitio correspondiente todos estos desperdicios, para que estos puedan ser debidamente procesados nuevamente. Así podemos dar vida a las TRES R (REDUCE, RECICLA, REUSA). según estudios realizados en EUROPA entre el 40% y el 60% de la población recicla. Pero de ese porcentaje solo el 30% recicla de manera correcta, es decir, que solo de ese porcentaje se puede sacar un beneficio para poder hacer un buen uso de los desperdicios y poder también ambientarnos a vivir en un mejor medio. ",
      "categoryId": getCategoriesId(1)
    },
    {
      "title": "¿Ahorro o desperdicio de energía eléctrica?",
      "content": "Hoy en día estamos acostumbrados a no vivir sin electricidad, con las nuevas tecnologías la situación que hemos vivió de pandemia, nos ha hecho a muchos el estar mas necesitados de este servicio, ya sea para estudiar como para trabajar. ¿Pero como dice el titulo ahorramos o simplemente desperdiciamos? Como consumidores de la energía eléctrica, hemos visto un alto incremento en los precios de este insumo. Por lo tanto, eso nos hace cambiar nuestra forma de vivir y tratar de no desperdiciarla si no mas bien ahora ahorrar. Tanto la energía como en nuestra economía, el ahorrar no solo se debe a cambiar los bombillos de luz en nuestra casa, sino que también, desconectar cualquier dispositivo que no usemos de los enchufes ya que no están gastando energía, pero si están consumiendo, y también nos ahorraríamos cualquier accidente que pueda ocurrir.  Pensamos que dejando un ordenador conectado no estamos gastando energía, pero estamos realmente haciendo un desperdicio de este uso, seguido de ello que si dejamos el ordenador conectado todo el tiempo tendremos un desperdicio de energía eléctrica, así como del aparato tecnológico porque se nos podría estropear y esto no causaría un ahorro. ",
      "categoryId": getCategoriesId(1)
    },
  ]
