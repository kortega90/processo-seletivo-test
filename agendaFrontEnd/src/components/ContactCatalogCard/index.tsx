import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import ContactTableBody from "../ContactTableBody";
import * as scheduleService from "../../services/schedule.service";
import "./styles.css";
import { useParams } from "react-router-dom";

export default function ContactCatalogCard() {

  const params = useParams();
  const schedule = scheduleService.findbyId(Number(params.scheduleId));

  return (
    <>

        
        <TableContainer component={Paper} className="table-container">

          <div style={{padding:"10px 0"}}>
           <h2> Contactos da Agenda :<span/> {schedule?.name}</h2>
          </div>

          <Table className="agenda-table">
            <TableHead>
              <TableRow>
                <TableCell className="name">Name</TableCell>
                <TableCell className="cep">cep</TableCell>
                <TableCell className="email">email</TableCell>
                <TableCell className="phone">phone</TableCell>
                <TableCell className="cnpj">cnpj</TableCell>
                <TableCell className="cpf">cpf</TableCell>
                <TableCell className="actions">Actions</TableCell>
              </TableRow>
            </TableHead>
            {schedule &&
              schedule.contacts.map((contact) => (
                <ContactTableBody key={contact.id} contact={contact} />
              ))}
          </Table>
        </TableContainer>
    </>
  );
}
