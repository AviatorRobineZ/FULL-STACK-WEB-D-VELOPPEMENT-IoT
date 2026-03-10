const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
},    {threshold: 0.6}) ;

sections.forEach(section => navObserver.observe(section));

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({behavior: 'smooth'});
        } 
    });
});

const main = document.querySelector('main');
const backToTop = document.createElement('button');
backToTop.id = 'top';
backToTop.textContent = '↑';
main.append(backToTop);

window.addEventListener('scroll', () => {
    if(window.scrollY> 100) {
        backToTop.classList.add('visible');
    }
    else {
        backToTop.classList.remove('visible');
    }
});


backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 40, behavior: 'smooth'});
});
backToTop.style.width = '30px';


const revealElements = document.querySelectorAll('#projets article, #competences li');
//revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const siblings = Array.from(entry.target.parentElement.children);
            const i = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${i * 0.1}s`;
            entry.target.classList.add('visible');
        }
    });
}, 
 {threshold: 0.1} );
revealElements.forEach(el => revealObserver.observe(el));



const projetsSection = document.querySelector('#projets');
const dynamicContainer = document.createElement('article');
projetsSection.appendChild(dynamicContainer);

const loadExternalData = async () => {
  dynamicContainer.innerHTML = '<p>Chargement...</p>';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=2');
    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
    const data = await response.json();

    dynamicContainer.innerHTML = '<h2> Données API</h2>';
    data.forEach((item, index) => {
      const card = document.createElement('article');
      Object.assign(card.style, {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`
      });
      card.innerHTML = `<h3 >${item.title}</h3><p>${item.body.substring(0, 100)}...</p>`;
      dynamicContainer.appendChild(card);

      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    });

  } catch (error) {
    dynamicContainer.innerHTML = `Erreur : ${error.message}</p>`;
  }
};

loadExternalData();





const toggleTheme= document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleTheme.textContent = 'Dark Mode';
} 
toggleTheme.addEventListener('click',() => {
    document.body.classList.toggle('dark');
     if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
        toggleTheme.textContent = 'Light Mode';
    }


});



const contactForm = document.querySelector('#contact form');
contactForm.innerHTML = ''; 


const createField = ({ tag = 'input', type = 'text', id, label, placeholder }) => {
  const group = document.createElement('section');
  Object.assign(group.style, { display: 'flex', flexDirection: 'column' });

  const lbl = document.createElement('label');
  lbl.setAttribute('for', id);
  lbl.textContent = label;
  lbl.style.marginBottom = '0.3rem';

  const input = document.createElement(tag);
  if (tag === 'input') input.type = type;
  input.id = id;
  input.name = id;
  input.placeholder = placeholder;
  Object.assign(input.style, {
    padding: '0.6rem 0.8rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box'
  });
  if (tag === 'textarea') {
    input.rows = 10;
    input.style.resize = 'vertical';
  }

  const error = document.createElement('span');
  error.id = `error-${id}`;
  Object.assign(error.style, {
    color: '#c0392b',
    fontSize: '0.85rem',
    marginTop: '0.3rem',
    minHeight: '1rem',
    display: 'block'
  });

  group.appendChild(lbl);
  group.appendChild(input);
  group.appendChild(error);
  return { group, input, error };
};


const { group: nameGroup, input: nameInput, error: nameError } =
  createField({ id: 'name', label: 'Nom', placeholder: 'Enter your name' });

const { group: emailGroup, input: emailInput, error: emailError } =
  createField({ id: 'email', type: 'email', label: 'Email', placeholder: 'Your email' });

const { group: msgGroup, input: msgInput, error: msgError } =
  createField({ tag: 'textarea', id: 'message', label: 'Message', placeholder: 'Leave a message for me' });


const submitBtn = document.createElement('button');
submitBtn.type = 'button';
submitBtn.textContent = 'Submit';
Object.assign(submitBtn.style, {
  padding: '0.7rem 1.6rem',
  fontSize: '1rem',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '12px',
  background: '#1B2A4A',
  color:'#F8F9FA'
});


const successMsg = document.createElement('div');
Object.assign(successMsg.style, {
  marginTop: '1rem',
  padding: '0.8rem 1rem',
  background: '#d4edda',
  color: '#D35400',
  borderRadius: '6px',
  fontWeight: 'bold',
  display: 'none',
  opacity: '0',
  transition: 'opacity 0.4s ease'
});
successMsg.textContent = 'Message envoyé avec succès !';


contactForm.appendChild(nameGroup);
contactForm.appendChild(emailGroup);
contactForm.appendChild(msgGroup);
contactForm.appendChild(submitBtn);
contactForm.appendChild(successMsg);


const validators = {
  name:    val => val.trim().length >= 2  ? '' : 'Le nom doit contenir au moins 2 caractères.',
  email:   val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? '' : 'Adresse email invalide.',
  message: val => val.trim().length >= 20 ? '' : `Message trop court (${val.trim().length}/20 caractères minimum).`
};


nameInput.addEventListener('input',  () => { nameError.textContent  = validators.name(nameInput.value); });
emailInput.addEventListener('input', () => { emailError.textContent = validators.email(emailInput.value); });
msgInput.addEventListener('input',   () => { msgError.textContent   = validators.message(msgInput.value); });


submitBtn.addEventListener('click', () => {
  const errName  = validators.name(nameInput.value);
  const errEmail = validators.email(emailInput.value);
  const errMsg   = validators.message(msgInput.value);

  nameError.textContent  = errName;
  emailError.textContent = errEmail;
  msgError.textContent   = errMsg;

  if (errName || errEmail || errMsg) return;

  submitBtn.disabled = true;
  submitBtn.textContent = ' ...';

  const fakeAsyncSend = () => new Promise(resolve => setTimeout(resolve, 1500));

  fakeAsyncSend().then(() => {
    nameInput.value  = '';
    emailInput.value = '';
    msgInput.value   = '';
    nameError.textContent = emailError.textContent = msgError.textContent = '';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer';

   
    successMsg.style.display = 'block';
    setTimeout(() => { successMsg.style.opacity = '1'; }, 10);

  
    setTimeout(() => {
      successMsg.style.opacity = '0';
      setTimeout(() => { successMsg.style.display = 'none'; }, 400);
    }, 4000);
  });
});



// Configuration du graphique 
const ctx = document.getElementById('iotChart').getContext('2d'); 
const iotChart = new Chart(ctx, { 
  type: 'line', 
  data: { 
   labels: Array.from({length: 20}, (_, i) => `-${20-i}s`), 
    datasets: [ 
      { label: 'Température (°C)', data: [], borderColor: '#D35400', 
tension: 0.4 }, 
      { label: 'Humidité (%)',     data: [], borderColor: '#148F77', 
tension: 0.4 }, 
      { label: 'Luminosité',       data: [], borderColor: '#D4AC0D', 
tension: 0.4 }, 
    ] 
  }, 
  options: { animation: { duration: 500 }, responsive: true } 
}); 

 
// Simulateur de données capteurs 
const generateSensorData = () => ({ 
  temp     : 25 + Math.random() * 10 - 5, 
  humidity : 60 + Math.random() * 20 - 10, 
  light    : 300 + Math.random() * 200 - 100, 
}); 
 
// Mise à jour toutes les 2 secondes 
setInterval(() => { 
  const data = generateSensorData(); 
  iotChart.data.datasets[0].data.push(data.temp.toFixed(1)); 
  iotChart.data.datasets[1].data.push(data.humidity.toFixed(1)); 
  iotChart.data.datasets[2].data.push(data.light.toFixed(0)); 
  // Garder seulement les 20 dernières valeurs 
  iotChart.data.datasets.forEach(ds => { 
    if (ds.data.length > 20) ds.data.shift(); 
  })
  iotChart.update();
}, 2000);





let isPaused = false;
let simulationInterval;
let vitess = 1000; 


window.stopChart = function() {
    isPaused = true;
    console.log("Simulation en pause");
};

window.startChart = function() {
    isPaused = false;
    console.log("Simulation reprise");
};


function startSimulation() {
    clearInterval(simulationInterval); 

    simulationInterval = setInterval(() => {
        if (!isPaused) { 
            const newTime = new Date().toLocaleTimeString().slice(3, 8);

            const dataTemp = (Math.random() * 5 + 20).toFixed(1);
            const dataHum = (Math.random() * 10 + 40).toFixed(1);
            const dataLum = Math.floor(Math.random() * 500);

            iotchart.data.labels.push(newTime);
            iotchart.data.datasets[0].data.push(dataTemp);
            iotchart.data.datasets[1].data.push(dataHum);
            iotchart.data.datasets[2].data.push(dataLum);

            if (iotchart.data.labels.length > 10) {
                iotchart.data.labels.shift();
                iotchart.data.datasets.forEach(ds => ds.data.shift());
            }

            iotchart.update();
        }
    }, vitess); 
}


window.changerVitesse = function() {
    const select = document.getElementById('vitesse');
    if (select) {
      vitess= parseInt(select.value);
      console.log(`Vitesse changée à ${vitess} ms`);
    } else {
      console.error("Sélecteur de vitesse introuvable !");

        } 
};

startSimulation();

function changeVitesse(value) {
  console.log("speed changed to: " + value);
}


function startSimulation() {
  clearInterval(simulationInterval);
  simulationInterval = setInterval(() => {
    if (!isPaused) {
      const newData = generateSensorData();
      const newTime = new Date().toLocaleTimeString().slice(3, 8);
    }
  }, vitess);
}

// Hide Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display= 'block';
  }, 1000)
});