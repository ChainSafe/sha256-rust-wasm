import {sha256, sha256_init, sha256_update, sha256_final} from './wasm-build';

export class Sha256 {

    private state: Uint8Array;

    public static hash(message: Uint8Array): Uint8Array {
        return sha256(message);
    }

    public static hashString(message: string): string {
        return Sha256.abToHex(Sha256.hash(Sha256.str2ab(message)));
    }

    public static create() : Sha256 {
        return new Sha256();
    }

    public constructor() {
        this.state = sha256_init();
    }

    public update(input: Uint8Array): Sha256 {
        this.state = sha256_update(this.state, input);
        return this;
    }

    public final(): Uint8Array {
        this.state = sha256_final(this.state);
        return this.state.slice();
    }

    public static str2ab(str: string): Uint8Array {
        const buf = new Uint8Array(str.length);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            buf[i] = str.charCodeAt(i);
        }
        return buf;
    }

    public static abToHex(arr: Uint8Array): string {
        let string = "";
        for (let i = 0, arrLength = arr.length; i < arrLength; i++) {
            string += arr[i].toString(16)
        }
        return string;
    }

}