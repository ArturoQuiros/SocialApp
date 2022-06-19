import Image from 'next/image'

function Modal(props){
    return (
        <>
        <div className="overlay"></div>
        <div className="modal">
          <header className="modal__header">
            <h2 class="text-2xl">{props.title}</h2>
            <button onClick={props.close} className="close-button">&times;</button>
          </header>
          <main className="modal__main">
            <Image alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
                        src={props.url + ".png"} width="600px" height="600px"></Image>
          </main>
        </div>
      </>
    )
}

export default Modal;