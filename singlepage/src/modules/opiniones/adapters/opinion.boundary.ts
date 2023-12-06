import { OpinionController } from './opinion.controller';


export const OpinionBoundary = {
    registrarOpinion: OpinionController.registrarOpinion,
    votarOpinion: OpinionController.votarOpinion,
    eliminarOpinion: OpinionController.eliminarOpinion
}