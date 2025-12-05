import css from "./ManualPage.sass?inline"
import {Await, createElement, LocalLink, PageContext, PageFactory} from "@naomiarotest/lib-jsx"
import {StudioService} from "@/service/StudioService.ts"
import {ThreeDots} from "@/ui/spinner/ThreeDots"
import {BackButton} from "@/ui/pages/BackButton"
import {Markdown} from "@/ui/Markdown"
import {Manual, Manuals} from "@/ui/pages/Manuals"
import {Html} from "@naomiarotest/lib-dom"
import {MenuItem} from "@/ui/model/menu-item"
import {panic} from "@naomiarotest/lib-std"

const className = Html.adoptStyleSheet(css, "ManualPage")

const addManuals = (manuals: ReadonlyArray<Manual>): ReadonlyArray<MenuItem> => manuals.map(manual => {
    if (manual.type === "page") {
        return <LocalLink href={manual.path}>{manual.label}</LocalLink>
    } else if (manual.type === "folder") {
        return (
            <nav>
                <div>• {manual.label}</div>
                <div>{...addManuals(manual.files)}</div>
            </nav>
        )
    } else {
        return panic()
    }
})

export const ManualPage: PageFactory<StudioService> = ({service, path}: PageContext<StudioService>) => {
    return (
        <div className={className}>
            <aside>
                <BackButton/>
                <nav>
                    <LocalLink href="/manuals/">⇱</LocalLink>
                    {addManuals(Manuals)}
                </nav>
            </aside>
            <div className="manual">
                {path === "/manuals/" ? (<p>Select a topic in the side bar...</p>) : (<Await
                    factory={() => fetch(`${path ?? "index"}.md?uuid=${service.buildInfo.uuid}`).then(x => x.text())}
                    failure={(error) => `Unknown request (${error.reason})`}
                    loading={() => <ThreeDots/>}
                    success={text => <Markdown text={text}/>}
                />)}
            </div>
        </div>
    )
}