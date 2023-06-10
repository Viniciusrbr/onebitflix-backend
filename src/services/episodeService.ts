import { Response } from 'express'
import fs from 'fs'
import path from 'path'

export const episodeService = {
    streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) => {

        const filePath = path.join(__dirname, '../../uploads', videoUrl) // caminho do arquivo
        const fileStat = fs.statSync(filePath) // informações do arquivo


        if (range) {
            const parts = range.replace(/bytes=/, '').split('-')

            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1 // se não houver o segundo valor, o end será o tamanho do arquivo - 1
           
            const chunkSize = (end - start) + 1 // tamanho do chunk

            const file = fs.createReadStream(filePath, { start, end }) // cria um stream do arquivo

            // cabeçalho da resposta
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(206, head) // 206 => Partial Content
            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileStat.size,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(200, head)// agora não temos mais o range, então o status é 200
            fs.createReadStream(filePath).pipe(res)
        }

    },
}