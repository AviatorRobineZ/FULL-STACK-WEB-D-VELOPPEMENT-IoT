import myself from '../assets/myself.jpeg';


const Hero = () => {
    return (
        <>
                <h1>Accueil</h1>
                <h3>My world</h3>
                <p> Bienvenue sur mon portfolio. Je suis Mamy Laine Soumaoro etudiante L3 en System d'information au GCTU, pationnee par le developement web et
                    les technologies IoT. Je concois des solutions numeriques modernes et fonctionnelles.
                </p>
                <img src={myself} alt="My image" width="100%"  />
        </>
    );
};
export default Hero;