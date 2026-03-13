import Hero from '../components/Hero';
import SkillCard from '../components/SkillCard';
import IoTDemo from '../components/IoT-Demo';
import PageTransition from '../components/PageTransition';

function Home () {
    return(
        <PageTransition>
            <Hero />
            <SkillCard />
            <IoTDemo />
        </PageTransition>
    );
};
export default Home;