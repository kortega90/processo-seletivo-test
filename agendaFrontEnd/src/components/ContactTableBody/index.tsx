import edit from "../../assets/edit-icon.svg";
import del from "../../assets/delete-button.svg";
import  * as contactService from "../../services/contact-service"
import "./styles.css";
import { ContactDTO } from "../../models/contact";
import { TableBody, TableRow, TableCell } from "@mui/material";
import DialogInfo from "../DialogInfo";
import DialogConfirmation from "../DialogConfirmation";
import { useState } from "react";

type Props = {
  contact: ContactDTO;
  onDeleteContact: () => void;
};

export default function ContactCatalogBody({ contact, onDeleteContact }: Props) {

  // const navigate = useNavigate();
  
  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    menssage: "Operação com Sucesso",
  });

  const [dialogConfirmationData, setDialogConfirmationData] = useState({
    visible: false,
    id: 0,
    message: "Tem Certeza?",
  });

  function handleDialogInfoClose() {
    setDialogInfoData({ ...dialogInfoData, visible: false });
  }

  function handleDialogDeleteClick(scheduleId:number) {
    setDialogConfirmationData ({ ...dialogConfirmationData, id:scheduleId , visible: true });
  }


  function handleDialogConfirmationAnswer(answer: boolean, contactId:number){
    if (answer){
       contactService.deleteById(contactId)
       .then( () =>{
         onDeleteContact(); 
       })
       .catch(error => {
        setDialogInfoData({
          visible: true,
          menssage: error.response.data.error
        })
       })
    }
    setDialogConfirmationData({...dialogConfirmationData, visible: false});
  }


  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>{contact.name}</TableCell>
          <TableCell>{contact.cep}</TableCell>
          <TableCell>{contact.email}</TableCell>
          <TableCell>{contact.phone}</TableCell>
          <TableCell>{contact.cnpj ? contact.cnpj : "-"}</TableCell>
          <TableCell>{contact.cpf ? contact.cpf : "_"}</TableCell>
          <TableCell className="actions">
            <div className="actions-icons">
              <div className="edit-button dsc-menu-items-container">
                <img src={edit} alt="Editar" />
              </div>
              <div className="delete-button dsc-menu-items-container">
                <img 
                onClick={() =>handleDialogDeleteClick(contact.id)}
                src={del} alt="Excluir" />
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
      {dialogInfoData.visible && (
        <DialogInfo
          message={dialogInfoData.menssage}
          onDialogClose={handleDialogInfoClose}
        />
      )}
      {dialogConfirmationData.visible && (
        <DialogConfirmation
          id={dialogConfirmationData.id}
          message={dialogConfirmationData.message}
          onDialogAnswer={handleDialogConfirmationAnswer}
        />
      )}
    </>
  );
}
