import { Evento } from "./Evento";
import { RedeSocial } from "./RedeSocial";

export interface Palestrante {
  id: number;
  nome: string;
  miniCurriculo: string;
  imageURL: string;
  telefone: string;
  email: string;
  redeSocial: RedeSocial[];
  palestranteEventos: Evento[];
}
