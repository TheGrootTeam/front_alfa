import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import styles from './AboutPage.module.css';
import { UserData } from '../../components/about/UserData';
import INext from '../../assets/icons/inext.svg?react';
import Image from '../../assets/about.jpg';

export function AboutPage() {
  const { t } = useTranslation();
  return (
    <>
      <Layout title={t('titles.about')} page="about">
        {/* INTRO PROYECTO */}
        <section className={styles.about__project}>
          <div className={styles.intro}>
            <div className={styles.photo}>
              <img src={Image} className={styles.photo} alt="" />
            </div>
            <div className={styles.content}>
              <p>
                <strong>InternIT.tech</strong> es una plataforma innovadora
                diseñada para conectar a empresas con profesionales que buscan
                nuevas oportunidades laborales. A través de una interfaz
                intuitiva y fácil de usar, las empresas pueden publicar ofertas
                de prácticas, mientras que los postulantes tienen la posibilidad
                de aplicar a ellas y enviar mensajes directamente a las
                empresas. Nos enfocamos en ofrecer una solución eficiente tanto
                para la búsqueda de empleo como para la gestión de candidatos,
                integrando funcionalidades que facilitan la comunicación entre
                ambos.
              </p>
            </div>
          </div>
          <h2 className={styles.h2}>Funcionalidades</h2>
          <div className={styles.funcionalidades}>
            <div>
              <h3 className={styles.h3}>Para Aplicantes</h3>
              <ul>
                <li>
                  <strong>Búsqueda de Ofertas:</strong> Los usuarios pueden
                  buscar entre una amplia gama de ofertas de trabajo publicadas
                  por diversas empresas.
                </li>
                <li>
                  <strong>Postulación a Ofertas:</strong> Una vez que el
                  aplicante encuentra una oferta de su interés, puede ponerse en
                  contacto con la empresa, la cual tendrá acceso a su perfil de
                  candidato con su CV, datos profesionales y preferencias{' '}
                  <em>
                    (en desarrollo: permitir al candidato aplicar directamente a
                    través de la plataforma)
                  </em>
                </li>
                <li>
                  <strong>Contacto Directo con Empresas:</strong> Los aplicantes
                  pueden contactar directamente con las empresas a través de un
                  botón habilitado en cada oferta de trabajo. Al hacer clic, se
                  abre un modal donde pueden redactar un mensaje que será
                  enviado al equipo de la aplicación, el cual hace llegar este
                  mensaje a la empresa desde un correo no-reply.
                </li>
                <li>
                  <strong>Perfil Personalizado:</strong> Cada usuario puede
                  configurar y actualizar su perfil profesional, lo que permite
                  a las empresas visualizar su experiencia, habilidades y
                  referencias.
                </li>
              </ul>
            </div>
            <div>
              <h3 className={styles.h3}>Para Empresas</h3>
              <ul>
                <li>
                  <strong>Publicación de Ofertas de Trabajo:</strong> Las
                  empresas pueden publicar ofertas de empleo detalladas,
                  especificando los requisitos, beneficios y condiciones
                  laborales. Las publicaciones pueden ser gestionadas y
                  actualizadas en tiempo real.
                </li>
                <li>
                  <strong>Mensajes Directos de Aplicantes:</strong> A través de
                  la funcionalidad de mensajes, las empresas reciben
                  comunicaciones de los aplicantes interesados directamente en
                  su bandeja de entrada, lo que facilita el contacto y la toma
                  de decisiones sobre potenciales candidatos.
                </li>
                <li>
                  <strong>Panel de Control:</strong> Las empresas cuentan con un
                  panel donde pueden gestionar todas sus ofertas de trabajo{' '}
                  <em>
                    (en desarrollo: revisar estadísticas sobre las postulaciones
                    y recibir informes detallados de los perfiles de los
                    candidatos)
                  </em>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SOBRE NOSOTROS */}
        <section className={styles.about__us}>
          <h2 className={styles.h2}>Sobre nosotros</h2>
          <ul className={styles.group__members}>
            <li className={styles.member__card}>
              <UserData
                name="David Arrarás López"
                github="darrlop"
                linkedin="david-arraras-lopez"
                photo="david.jpeg"
              >
                A lo largo de mi vida siempre me sentí atraído por la
                tecnología, lo que en su momento me llevó a estudiar Informática
                de Sistemas. Ahora, tras un largo tiempo de experiencia en el
                ámbito comercial decidí dar un giro a mi carrera y retomar lo
                que realmente me apasiona: el desarrollo de aplicaciones. Este
                proceso de reciclaje profesional me ha permitido reenfocar mis
                habilidades técnicas y creativas, preparándome para afrontar
                nuevos desafíos del sector.
              </UserData>
            </li>
            <li className={styles.member__card}>
              <UserData
                name="Carles Espuñes González"
                github="cespuess"
                linkedin="carles-espuñes-gonzalez-7a917626a"
                photo="carles.jpeg"
              >
                Desde pequeño me había atraído el mundo de la informática, más
                exactamente el desarrollo web. Aprendí las bases de programación
                en el bootcamp "Aprende a Programar desde Cero" con KeepCoding y
                luego me lancé a por el Bootcamp Full Stack, con el que he
                expandido mis habilidades desde los fundamentos hasta niveles
                avanzados en tecnologías clave y equipándome con las
                herramientas y conocimientos necesarios para hacer la transición
                a esta apasionante carrera profesional.
              </UserData>
            </li>
            <li className={styles.member__card}>
              <UserData
                name="Ivette Farré Prat"
                github="Iv3tt3"
                linkedin="ivettefarreprat"
                photo="ivette.jpeg"
              >
                Desde que tengo memoria he estado siempre trasteando con algún
                programa informático y softwares de diseño gráfico, creando de
                forma amateur webs con uso de plataformas y también trasteando
                algo de código. Con una sólida experiencia en el mundo
                empresarial, busco constantemente adquirir nuevas habilidades
                digitales. Apasionada por las tecnologías emergentes y la
                psicología orientada al crecimiento personal, mi objetivo es
                contribuir a la creación de una tecnología ética, accesible,
                eficiente y sostenible.
              </UserData>
            </li>
            <li className={styles.member__card}>
              <UserData
                name="Syra Ramírez Domínguez"
                github="SyraDominguez"
                linkedin="syradominguez"
                photo="syra.jpeg"
              >
                Apasionada del desarrollo personal y la tecnología en constante
                transformación. Con una sólida trayectoria en servicios de
                atención al cliente, he tenido la oportunidad de perfeccionar
                mis soft skills para conectar mejor y más productivamente con
                las personas. Emocionada con los avances tecnológicos que
                estamos viviendo y lo que vamos a vivir, me encanta todo lo que
                huela a nuevas tecnologías y por ello estoy ilusionada por poder
                contribuir al emocionante mundo del desarrollo web.
              </UserData>
            </li>
            <li className={styles.member__card}>
              <UserData
                name="Marta Vilaseca Foradada"
                github="marta-vilaseca"
                linkedin="martavilaseca"
                photo="marta.jpeg"
              >
                Desarrolladora apasionada por crear experiencias digitales
                atractivas, buscando el equilibrio entre creatividad y técnica.
                La informática y la tecnología me han fascinado desde pequeña, y
                el diseño y desarrollo web resultaron ser la combinación ideal
                de mis intereses. Fundamentalmente autodidacta, aprendí por mi
                cuenta y trabajé en el sector, al cual regreso ahora con energía
                y conocimientos renovados. Soy autónoma y curiosa, siempre en
                busca de perfeccionar mis habilidades y asumir nuevos desafíos.
              </UserData>
            </li>
          </ul>
        </section>

        {/* ARQUITECTURA DE LA APLICACION */}
        <section className={styles.about__architecture}>
          <h2 className={styles.h2}>Arquitectura de la Aplicación</h2>
          <p>
            Nuestra aplicación sigue una arquitectura moderna basada en
            componentes, tanto en el frontend como en el backend, con una clara
            separación de responsabilidades:
          </p>
          <ul>
            <li>
              <strong>Frontend:</strong> La interfaz de usuario es una SPA,
              diseñada para ser modular y escalable. La lógica de la aplicación
              está gestionada por Redux, y las interacciones con el backend se
              realizan a través de peticiones API. La internacionalización nos
              permite ofrecer soporte multilingüe.
            </li>
            <li>
              <strong>Backend:</strong> La arquitectura del backend sigue el
              patrón MVC (Modelo-Vista-Controlador), lo que nos permite
              organizar el código de manera eficiente. Además, el backend expone
              APIs RESTful que permiten la comunicación fluida con el frontend y
              la base de datos.
            </li>
            <li>
              <strong>Docker:</strong> Gracias a la integración de Docker, tanto
              el frontend como el backend pueden ser ejecutados en contenedores,
              lo que facilita su despliegue en diferentes plataformas de manera
              eficiente y confiable.
            </li>
          </ul>
        </section>

        {/* TECNOLOGIAS UTILIZADAS */}
        <section className={styles.about__technologies}>
          <h2 className={styles.h2}>Tecnologías utilizadas</h2>
          Hemos construido la aplicación utilizando tecnologías modernas que
          garantizan escalabilidad, seguridad y una excelente experiencia de
          usuario. Entre las principales tecnologías se incluyen:
          <h3 className={styles.h3}>Frontend</h3>
          <ul className={styles.technologies__list}>
            <li>
              <i className="devicon-react-original colored"></i>
              <div>
                <strong>REACT</strong> La interfaz de usuario está construida
                como una SPA (Single Page Application) utilizando React, lo que
                permite una navegación rápida y fluida.
              </div>
            </li>
            <li>
              <i className="devicon-redux-original colored"></i>
              <div>
                <strong>REDUX</strong> Para gestionar el estado global de la
                aplicación, utilizamos Redux, lo que facilita el manejo
                eficiente de la información a lo largo de la aplicación.
              </div>
            </li>
            <li>
              <i className="devicon-axios-plain colored"></i>
              <div>
                <strong>AXIOS</strong> Usamos Axios para realizar peticiones
                HTTP y gestionar la comunicación con el backend.
              </div>
            </li>
            <li>
              <i className="devicon-vitejs-plain colored"></i>

              <div>
                <strong>VITE</strong> Hemos adoptado Vite como herramienta de
                construcción, lo que nos permite desarrollar con tiempos de
                recarga más rápidos y una experiencia de desarrollo optimizada.
              </div>
            </li>
            <li>
              <i className="devicon-typescript-plain colored"></i>
              <div>
                <strong>TYPESCRIPT</strong> Todo el frontend está escrito en
                TypeScript, añadiendo robustez mediante el uso de tipado
                estático.
              </div>
            </li>
            <li>
              <INext className={styles.icon} />
              <div>
                <strong>I18NEXT</strong> La aplicación soporta múltiples idiomas
                gracias a esta herramienta de internacionalización.
              </div>
            </li>

            <li>
              <span
                className={`material-symbols-outlined ${styles.materialIcon}`}
              >
                wysiwyg
              </span>

              <div>
                <strong>REACT MODAL</strong> Esta biblioteca permiten ofrecer
                una experiencia de usuario más interactiva, mediante alertas y
                modales para interacciones importantes.
              </div>
            </li>
          </ul>
          <h3 className={styles.h3}>Backend</h3>
          <ul className={styles.technologies__list}>
            <li>
              <i className="devicon-nodejs-plain colored"></i>
              <div>
                <strong>NODEJS (con TypeScript)</strong> El backend está
                construido con Node.js utilizando TypeScript para asegurar un
                código limpio y escalable.
              </div>
            </li>
            <li>
              <i className="devicon-express-original colored"></i>
              <div>
                <strong>EXPRESS</strong> Esta potente herramienta facilita la
                gestión de rutas y la creación de APIs RESTful.
              </div>
            </li>
            <li>
              <i className="devicon-docker-plain colored"></i>
              <div>
                <strong>DOCKER</strong> Hemos integrado Docker para garantizar
                que la aplicación se ejecute de manera consistente en distintos
                entornos, lo que facilita su despliegue y mantenimiento.
              </div>
            </li>
            <li>
              <span
                className={`material-symbols-outlined ${styles.materialIcon}`}
              >
                enhanced_encryption
              </span>
              <div>
                <strong>DOTENV</strong> Para la gestión de configuraciones
                sensibles, utilizamos dotenv, lo que nos permite mantener un
                entorno seguro.
              </div>
            </li>
            <li>
              <i className="devicon-mongodb-plain colored"></i>
              <div>
                <strong>Base de datos MONGODB</strong> La aplicación se conecta
                a una base de datos segura y optimizada, garantizando la
                integridad y disponibilidad de la información.
              </div>
            </li>
          </ul>
        </section>
      </Layout>
    </>
  );
}
