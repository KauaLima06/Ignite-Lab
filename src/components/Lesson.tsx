import React from "react";
import { CheckCircle , Lock} from "phosphor-react";
import { isPast , format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

interface ILessonProps {
    title: string;
    slug: string;
    availiable_at: Date;
    type: "live" | "class";
}

export function Lesson({ title, slug, availiable_at, type }: ILessonProps){

    const { slug: classSlug } = useParams<{ slug: string }>();
 
    const isLessonAvaliable = isPast(availiable_at);
    const availbleDateFormat = format(availiable_at, "EEEE ' • 'd' de ' MMMM' • ' k'h'mm", {
        locale: ptBR,
    });

    const isActiveLesson = classSlug === slug;
 
    return (
        <Link to={`/event/lesson/${slug}`} className="group">
            <span className="text-gray-300">
                { availbleDateFormat }
            </span>

            <div
            className={classNames("rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",{
                'bg-green-500': isActiveLesson,
            })}
            >
                <header className="flex items-center justify-between">
                    { isLessonAvaliable ? (
                        <span className={classNames("text-sm font-medium flex items-center gap-2", {
                            "text-white": isActiveLesson,
                            "text-blue-500": !isActiveLesson,
                        })}>
                            <CheckCircle size={20}/>
                            Conteúdo Liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20}/>
                            Em Breve...
                        </span>
                    )}
                    <span className={classNames("text-xs rounded py-[0.125rem] px-2 border font-bold", {
                        "border-white": isActiveLesson,
                        "border-green-500": !isActiveLesson,
                    })}>
                        { type == "live" ? "Ao Vivo" : "Aula Prática" }
                    </span>
                </header>
                <strong className={classNames("mt-5 block", {
                    "text-white": isActiveLesson,
                    "text-gray-200": !isActiveLesson,
                })}>
                    { title }
                </strong>
            </div>
        </Link>
    )
}