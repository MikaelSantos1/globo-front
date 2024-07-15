import { Button } from "../ui/button";


export function Header() {

    return (
        <div className="mx-auto flex  items-center justify-between border-b pb-2 bg-slate-950 px-10" >
            <h1 className="text-amber-50 text-2xl font-bold">IMBD</h1>
            <Button>
                Sair
            </Button>

        </div>
    )
}