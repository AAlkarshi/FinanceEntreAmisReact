import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];



// AFFICHAGE PRINCIPALE
export default function App () {
  const [AfficheAjoutAmi , setAfficheAjoutAmi] = useState(false);
  const [amis, setAmis] = useState(initialFriends);
  const [SelectionAmi, setSelectionAmi] = useState(null);

  

  

  //BTN AJOUT AMI QUI APPARAIT ET DISPARAIT AU RECLIC
  function AjoutAmidansListe() {
    setAfficheAjoutAmi((show) => !show);
  }

  //AJOUT D'UN AMI
  function AjoutAmi(ami) {
    setAmis((amis) => [...amis, ami]);
    setAfficheAjoutAmi(false);
    setSelectionAmi(null); 
  }


  // SELECTION AMI AVEC UN CLIC
  function selectionAmiclick(ami) {
    setSelectionAmi((selected) =>
      selected?.id === ami.id ? null : ami);
    
    //Fermer le form d'AJOUT AMI quand le form de FACT est ouvert
    setAfficheAjoutAmi(false);
  }

  
  
  function PasserFacturePartager(value) {
    console.log(value);

      setAmis(amis => 
      amis.map(ami => ami.id === SelectionAmi.id ? 
      {...ami, balance : ami.balance + value }
      : ami
      ) 
    );

    //Apres avoir passer la facture le FORM à Droite Disparait
    setSelectionAmi(null);

  }


  return ( 
    <div className="app"> 
       
        <div className="sidebar">
        <SommeTotal amis={amis} /> 
        <p> <SommeaDonner amis={amis} /> </p>
        <p> <SommeaRecevoir amis={amis} /> </p>




        <ListeAmis 
          amis={amis} 
          selectionAmi={SelectionAmi} 
          onSelection={selectionAmiclick} 
        />


            {AfficheAjoutAmi && < AjoutAmiForm onAjoutAmis={AjoutAmi}  />}
              <Button onClick={AjoutAmidansListe}> 
                {AfficheAjoutAmi ? 'Ne pas rajouter' : 'Ajout Ami'}
              </Button>
        </div>
              {SelectionAmi && <FormFermeture 
              SelectionAmi={SelectionAmi} 
              onFacturePartager={PasserFacturePartager} />}
      </div>
  );
}





//SOMME TOTAL
function SommeTotal({amis}) {
  const ArgentTotal = amis.reduce((total, ami) => total + ami.balance, 0);
  return (
    <div> <h1>Total : {ArgentTotal} €</h1>  </div>
  );
}




//SOMME A DONNER
function SommeaDonner({amis }) {
  const ArgentaRembourser =  amis.filter(ami => ami.balance < 0) // Filtrer dettes
          .reduce((total, ami) => total + Math.abs(ami.balance), 0); 
          // Math.abs (TJR EN POSITIVE) et Additionner les valeurs des dettes
  return (
    <div><p className="SommeRembourser">Argent à donner : {ArgentaRembourser} €</p></div>
  );
}



//SOMME A DONNER
function SommeaRecevoir({amis }) {
  const ArgentaRecevoir =  amis.filter(ami => ami.balance > 0) 
          .reduce((total, ami) => total + Math.abs(ami.balance), 0); 
  return (
    <div><p className="SommeRecup">Argent à récuperer : {ArgentaRecevoir} €</p></div>
  );
}














// les PARA sont les EVENEMENT CREER afin de liéedes EVENT avec des FONCTIONS
function ListeAmis({amis , onSelection , selectionAmi}) {
  return (
    <ul>  
      {amis.map((ami) => (
        <Ami 
          ami={ami} 
          key={ami.id}
          onSelection={onSelection}
          SelectionAmi={selectionAmi}
           /> 
  ))}
    </ul>
  );
}







function Ami({ami ,onSelection, SelectionAmi}) {
      const estSelectionner = SelectionAmi?.id === ami.id;
      console.log("SelectionAmi:", SelectionAmi, "ami.id:", ami.id);

      return ( 
        <li className={estSelectionner ? "selected" : ""}>
          <img src={ami.image} alt={ami.name} />
          <h3> {ami.name}</h3>

          {ami.balance < 0 && (
            <p className="red">
              Tu dois de l'argent à {ami.name} , une somme de  {Math.abs(ami.balance)} €
            </p>
          )}

          {ami.balance > 0 && (
            <p className="green">
              {ami.name} vous doit {Math.abs(ami.balance)} € 
            </p>
          )}

          {ami.balance === 0 && (
            <p>
             Toi et {ami.name} vous vous êtes rendu l'argent et vous êtes quittes
            </p>
          )}

          <Button onClick={() => onSelection(ami)}> 
            {estSelectionner ? 'Fermer' : 'Selectionner'}
          </Button>

          
        </li>
      );
}

function Button({children , onClick}) {
  return <button className="button" onClick={onClick} >{children}</button>;
}







// FORM NOUVEAU AMI
function AjoutAmiForm({onAjoutAmis}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function Enregistrement(e) {
      e.preventDefault();

      if (!name || !image) return;

      const id = crypto.randomUUID();
      const nouvelAmi = {
        id,
        name,
        image: `${image}?=${id}`,
        balance: 0,
      };

      onAjoutAmis(nouvelAmi);
  }


  return (
    <form className="form-add-friend" onSubmit={Enregistrement}>
      <label> 👩🏾‍🤝‍👩🏼Nom de l'Ami : </label>
      <input type="text" 
             value={name} 
             onChange={(e) => 
              setName(e.target.value)} 
      />

      <label> 📸Image Avatar :  </label>
      <input type="text"  
             value={image} 
             onChange={(e) => 
             setImage(e.target.value)} />

      <Button> Ajouter </Button>

    </form>
  )
}




function FormFermeture({SelectionAmi , onFacturePartager}) {
  const [facture, setFacture] = useState("");
  const [payerParUser, setpayerParUser] = useState("");
  const payerParAmi = facture ? facture - payerParUser : "";
  const [QuiPaye, setQuiPaye] = useState("user");

  function EnregistrementFacture(e) {
    e.preventDefault();

    //ne soit soumis si pas de FACT ou si USER pas payé ALORS RETURN
    if(!facture || !payerParUser) return;
    onFacturePartager(QuiPaye === 'user' ? payerParAmi : -payerParUser); 
  }


  return (
    <form className="form-split-bill" onSubmit={EnregistrementFacture}>
      <h2> Partager une facture avec {SelectionAmi.name} </h2>
        <label> 💰 Valeur de la Facturation :  </label>
        <input type="text" 
               value={facture} 
               onChange={(e) => setFacture(Number(e.target.value)) }
        />

        <label> 💲 Votre dépense :  </label>
        
        <input type="text" 
               value={payerParUser} 
               onChange={(e) => 
               setpayerParUser(
                Number(e.target.value) > facture ? payerParUser :
                Number(e.target.value)
              )}
        />

        <label> 🧔 Dépense de {SelectionAmi.name} :  </label>
        <input type="text" disabled value={payerParAmi}  
        />

        <label> 💳 Qui paye cette Facture ? </label>
          <select value={QuiPaye} 
                  onChange={(e) => setQuiPaye(e.target.value) }>
            <option value="user"> Vous </option>
            <option value="friend"> {SelectionAmi.name} </option>
          </select>

      <Button> Partager une Facturation </Button>
    </form>
  )
}



