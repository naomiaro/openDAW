import {Terminable} from "@naomiarotest/lib-std"

export interface FooterLabel extends Terminable {
    setTitle(value: string): void
    setValue(value: string): void
}