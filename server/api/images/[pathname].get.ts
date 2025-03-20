import { PhotonImage, resize, SamplingFilter } from '@cf-wasm/photon/node'

export default defineEventHandler(async (event) => {
    const path = getRouterParam(event, 'pathname')
    const { preview } = getQuery(event);
    if (preview === undefined) {
        const body = await hubBlob().serve(event, path || "")
        return body;
    } else {
        let line = 10;
        try {
            // create a PhotonImage instance
            const blob = await hubBlob().get(path || "")
            if (!blob) throw Error("blol null");
            const inputImage = PhotonImage.new_from_blob(blob);
            line = 16;
            const a = inputImage.get_width() / 300;
            line = a;
            const outputImage = resize(
                inputImage,
                inputImage.get_width() / a,
                inputImage.get_height() / a,
                SamplingFilter.Nearest
            );
            line = 25;
            const outputBytes = outputImage.get_bytes_webp();
            inputImage.free();
            outputImage.free();
            line = 29;

            // return the Response instance
            return new Response(outputBytes, {
                headers: {
                "Content-Type": "image/webp"
                }
            });
        } catch (e) {
            return new Response(JSON.stringify({
                ok: false,
                message: e,
                line
            }), {
                headers: {
                "Content-Type": "application/json"
            }})
        }
    }
})