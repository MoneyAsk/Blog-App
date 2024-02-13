import Styles from "./home.module.css";
import Image from "next/image";
const Home = () => {
  return (
    <div className={Styles.container}>

      <div className={Styles.textContainer}>
        <h1 className={Styles.title}>Creative Thoughts Agency</h1>
        <p className={Styles.description}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas a, quas maxime numquam esse placeat voluptatum alias</p>


      <div className={Styles.buttons}>
        <button className={Styles.button}>Learn More</button>
        <button className={Styles.button}>Contact</button>
      </div>

      <div className={Styles.brands}>
        <Image src="/brands.png" alt="" fill className={Styles.brandImg}/>

      </div>
      </div>
      <div className={Styles.imgContainer}>
      <Image src="/hero.gif" alt="" fill className={Styles.heroImg}/>

      </div>

    </div>
  )
}
export default Home;
