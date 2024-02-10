import { receiveUpdates, sendableUpdates, collab, getSyncedVersion,Update } from "@codemirror/collab";
import { ViewPlugin, ViewUpdate, EditorView } from "@codemirror/view";
import { Socket } from "socket.io-client";
import {ChangeSet, Text} from "@codemirror/state"


export function peerExtension(startVersion:number, socket:Socket, roomId:string) {
    console.log(roomId)
    async function pushUpdates(version:number, updates: Update[]) {
        const newUpdates = updates.map(u => ({
            clientID: u.clientID,
            changes: u.changes.toJSON()
        }))
        socket.emit("push", { version, newUpdates, roomId })
        console.log("Push")
    }

    let plugin = ViewPlugin.fromClass(class {
        pushing = false
        done = false
        view;

        constructor(view:EditorView) { this.view = view; this.pull(); }

        update(ViewUpdate: ViewUpdate) {
            console.log("ViewUpdate")
            if (ViewUpdate.docChanged) this.push();
            console.log("ViewUpdate")
        }

        async push() {
            let updates = sendableUpdates(this.view.state) as unknown as Update[];
            if ( !updates.length) return
            this.pushing = true
            let version = getSyncedVersion(this.view.state)
            await pushUpdates(version, updates)
            this.pushing = false
            // Regardless of whether the push failed or new updates came in
            // while it was running, try again if there's updates remaining
            if (sendableUpdates(this.view.state).length)
              setTimeout(() => this.push(), 100)
        }

        async pull() {
            // socket.emit()
            socket.on("sync", ({ newVersion, updates }:{newVersion:number,updates:Update[]}) => {
                let version = getSyncedVersion(this.view.state);
                console.log("booyaah")
                if (newVersion > version) {
                    const newUpdates = updates.slice(version).map(u => ({
                        changes: ChangeSet.fromJSON(u.changes),
                        clientID: u.clientID
                    }))
                     console.log(newUpdates.length,version,newVersion,"\n")
                    this.view.dispatch(receiveUpdates(this.view.state, newUpdates))
                     console.log(getSyncedVersion(this.view.state))
                }
            })

        }

        destroy() { this.done = true }
    })
    // console.log(plugin)
    return [collab({ startVersion }), plugin]
}