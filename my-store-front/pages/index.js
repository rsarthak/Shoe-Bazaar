import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import StoreContext from "../context/store-context";
import MedusaLogo from "../public/hero.PNG";
import styles from "../styles/landing-page.module.css";
import store from "../styles/store.module.css";
import footer from "../styles/footer.module.css";
import { createClient } from "../utils/client";
import { formatPrices } from "../utils/prices";

export default function Home({ products }) {
  const { cart } = useContext(StoreContext);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.title}>
            <h1 style={{ margin: 0 }}>Shoe Bazar</h1>
            {/* <h1 style={{ margin: 0 }}>+</h1>
            <h1 style={{ margin: 0 }}>Next.js starter</h1> */}
          </div>
          <p className={styles.description}>
            Let the feet breathe.
          </p>
        </div>
        <div className={styles.scrollIcon}>
          <Link href="#storeSection" scroll={true} passHref>
            <AiFillCaretDown style={{color:"white",marginTop:"4em"}}size={80}></AiFillCaretDown>
          </Link>
        </div>
        <section id="storeSection" className={store.container}>
          <h1 className={store.title}>Check out our store</h1>
          <div className={store.products}>
            <div className={store.grid}>
              {products &&
                products.map((p) => {
                  return (
                    <div key={p.id} className={store.card}>
                      <Link
                        href={{
                          pathname: `/product/[id]`,
                          query: { id: p.id },
                        }}
                        passHref
                      >
                        <a target="_blank">
                          <h2>{p.title}</h2>
                          <div className={store.imgHolder}>
                            <Image
                              src={p.thumbnail}
                              alt="thumbnail"
                              width={290}
                              height={300}
                            ></Image>
                          </div>
                          <p>{p.description}</p>
                          <p style={{ color: "#8a4af3" }}>
                            {formatPrices(cart, p.variants[0])}
                          </p>
                        </a>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
      <footer className={footer.container}>
        <div className={footer.main}>
          <div className={footer.listA}>
            <Link href="/">
              <a style={{ width: "95px" }}>
                <Image src={MedusaLogo} height="150px" width="155px" alt="logo" />
              </a>
            </Link>
            <span>
              Catch us on{" "}
              <Link href="mailto:Sarthakr748@gmail.com">
                <a style={{ fontWeight: "bold" }}>sarthakr748@gmail.com</a>
              </Link>
            </span>
          </div>
          <div className={footer.listA}>
            <h4>Docs</h4>
            <li>
              <Link href="https://docs.medusajs.com/tutorial/set-up-your-development-environment/">
                <a target="_blank">Tutorial</a>
              </Link>
            </li>
          </div>
          <div className={footer.listA}>
            <h4>Community</h4>
            <li>
              <Link href="https://twitter.com/medusajs">
                <a target="_blank">Twitter</a>
              </Link>
            </li>
            <li>
              <Link href="https://discord.com/invite/medusajs">
                <a target="_blank">Discord</a>
              </Link>
            </li>
          </div>
          <div className={footer.listA}>
            <h4>More</h4>
            <li>
              <Link href="https://medusajs.com/">
                <a target="_blank">Medusa Home</a>
              </Link>
            </li>
            <li>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/sarthak-rajput-6b924a15b/">
                <a target="_blank">Contact us</a>
              </Link>
            </li>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const client = createClient();
  const { products } = await client.products.list();

  return {
    props: {
      products,
    },
  };
};
