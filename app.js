//Variables

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector("#reset");
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();
function eventListeners(){
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);
    
    //Campos del formulario
    nombre.addEventListener('blur', validarFormulario)
    email.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)

    //Reinicia el formulario
    btnReset.addEventListener('click',resetearFormulario)


    //Enviar email
    formulario.addEventListener('submit', enviarEmail)

}



//Funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    
}

//Valida el formulario

function validarFormulario(e){

  

    if(e.target.value.length > 0) {

        //Elimina los errores...
        const error = document.querySelector('p.error2');
        if(error) {
           error.remove(); 
        }
        
        


        e.target.classList.add('ok');
        e.target.classList.remove('error');
        
    }else{
        e.target.classList.remove('ok');
        e.target.classList.add('error');

        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
        if(er.test(e.target.value)) {
            const error = document.querySelector('p.error2');
            if(error) {
                error.remove(); 
             }
    
    
            e.target.classList.add('ok');
            e.target.classList.remove('error');
        }else{
            e.target.classList.remove('ok');
            e.target.classList.add('error');

            mostrarError('Email no valido');
        }
    }

    if(er.test(email.value) && nombre.value !== '' && mensaje.value !== '' ){
        btnEnviar.disabled = false;
        btnEnviar.classList.add('enviar')
    }

}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('mensajeError', 'error2')

    const errores = document.querySelectorAll('.error2');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}


//Envia el email
function enviarEmail(e){
    e.preventDefault();

    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Despues de 3 segundos, ocultar el spinner y mostrar el mensaje

    setTimeout(() =>{
       spinner.style.display = 'none';

       //Mensaje que dice que se envio correctamente

       const parrafo = document.createElement('p');
       parrafo.textContent = 'El mensaje se envió correctamente'

       //Las clases son de tailwind
       parrafo.classList.add('text-center', 'my-10','p-3', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

       //Inserta el mensaje antes del spinner
       formulario.insertBefore(parrafo, spinner);

       setTimeout(() =>{
            parrafo.remove(); //Elimina el mensaje de envio
            
            resetearFormulario();
       },3000)
    }, 3000);
}

//Función que resetea el formulario

function resetearFormulario(){
    formulario.reset();

    iniciarApp();
}