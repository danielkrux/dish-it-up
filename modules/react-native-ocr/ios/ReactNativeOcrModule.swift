import ExpoModulesCore
import Foundation
import MLKitTextRecognition
import MLKitCommon
import MLKitTextRecognitionCommon
import MLKitVision

struct Result {
    let text: String
    let boundingBox: CGRect
}

func encodeResult(result: [TextBlock]) -> [[String:Any]?] {
    result.compactMap { currentBlock in
        return [
            "text": currentBlock.text,
            "boundingBox": [
                "x": currentBlock.frame.origin.x,
                "y": currentBlock.frame.origin.y,
                "width": currentBlock.frame.size.width,
                "height": currentBlock.frame.size.height
            ],
            "lines": currentBlock.lines.compactMap { line in
                return line.text
            }
        ]
    }
}

public class ReactNativeOcrModule: Module {
    
    public func definition() -> ModuleDefinition {
        Name("ReactNativeOcr")
        
        AsyncFunction("getTextFromImage") {(imageBase64: String, promise: Promise) in
            let imageData = Data(base64Encoded: imageBase64)
            let img = UIImage(data: imageData!)
            
            let options = TextRecognizerOptions()
            let textRecognizer = TextRecognizer.textRecognizer(options: options)
            
            let image = VisionImage(image: img!)
            image.orientation = img!.imageOrientation
            
            textRecognizer.process(image) { result, error in
                guard error == nil, let result = result else {
                    return
                }
                promise.resolve(encodeResult(result: result.blocks))
            }
        }
    }
}
