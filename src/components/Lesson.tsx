import React from "react";
import { CheckCircle , Lock} from "phosphor-react";
import { isPast , format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link } from "react-router-dom";

interface ILessonProps {
    title: string;
    slug: string;
    availiable_at: Date;
    type: "live" | "class";
}

export function Lesson({ title, slug, availiable_at, type }: ILessonProps){

    const isLessonAvaliable = isPast(availiable_at);
    const availbleDateFormat = format(availiable_at, "EEEE ' • 'd' de ' MMMM' • ' k'h'mm", {
        locale: ptBR,
    });
 
    return (
        <Link to={`/event/lesson/${slug}`} className="group">
            <span className="text-gray-300">
                { availbleDateFormat }
            </span>

            <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500">
                <header className="flex items-center justify-between">
                    { isLessonAvaliable ? (
                        <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
                            <CheckCircle size={20}/>
                            Conteúdo Liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20}/>
                            Em Breve...
                        </span>
                    )}
                    <span className="text-xs rounded py-[0.125rem] px-2 border border-green-500 font-bold">
                        { type == "live" ? "Ao Vivo" : "Aula Prática" }
                    </span>
                </header>
                <strong className="text-gray-200 mt-5 block">
                    { title }
                </strong>
            </div>
        </Link>
    )
}