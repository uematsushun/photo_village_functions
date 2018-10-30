import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// AdminSDKの初期化処理
admin.initializeApp(functions.config().firebase);

export const writeUrl = functions.storage.object().onFinalize( async (object) => {

    try {
        // 保存の参照先を取得する(async/await)
        const dest = admin.firestore().collection("chatroom").doc("IY2nwli8XAmZQhkt69s5").collection("assets").doc()

        // オブジェクトのメタデータからuidを取り出す
        // （メタデータはクライアントで設定したもの）
        const uid = object.metadata.uid

        // オブジェクトのメタデータからファイル名を取り出す
        const fileName = object.metadata.fileName

        // ダウンロードURL
        const downloadUrl = object.mediaLink

        // アップロード日時
        const uploadDate = object.timeCreated

        // データを追加する
        await dest.set({
            uid: uid,
            fileName: fileName,
            url: downloadUrl,
            created: uploadDate
        })
    }
    catch (error) {
        console.log(error)
    }
});