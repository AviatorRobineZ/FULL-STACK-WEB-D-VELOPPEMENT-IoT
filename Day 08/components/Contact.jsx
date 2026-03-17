import {useState} from 'react';

function Contact () {


    const [formData, setFormData] = useState({ 
    name: '', email: '', subject: '', message: '' 
    }); 
    const [errors, setErrors] = useState({}); 
    const [status, setStatus] = useState('idle'); 
    'idle'|'loading'|'success'|'error' 
    
    const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData(prev => ({ ...prev, [name]: value })); 
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' })); 
    }; 
    
    const validate = () => {
        const newErrors = {}; 
        if (!formData.name.trim()) newErrors.name = 'Le nom est requis'; 
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide'; 
        if (formData.message.length < 20) newErrors.message = 'Minimum 20 caractères'; 

        
        return newErrors; 
    }; 
    
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
    const errs = validate(); 
        if (Object.keys(errs).length > 0) { setErrors(errs); return; } 
        setStatus('loading'); 
        await new Promise(r => setTimeout(r, 1500)); 
        setStatus('success'); 
        setFormData({ name:'', email:'', subject:'', message:'' }); 
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Contact</h1>
                    <label>Name: </label> <br />
                    <input type="text" name="name" placeholder="Enter your name here" value={formData.name} onChange={handleChange} /> <br />
                    <label>Email: </label> <br />
                    <input type="email" name="email" placeholder="Enter your email here" value={formData.email} onChange={handleChange}  /> <br />
                    <label>Message</label> <br />
                    <textarea name="message" placeholder="Enter a message here" value={formData.message} onChange={handleChange} /> <br />
                    <button>Submit</button>
            </form>
        </>
    );
};
export default Contact;         