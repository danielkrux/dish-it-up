import ExpoModulesCore
import Foundation
import Vision

public func performTextRecognition<ResultType>(_ completion: @escaping ([VNRecognizedTextObservation]) -> [ResultType]) -> (UIImage) -> [ResultType] {
    return { image in
        guard let cgImage = image.cgImage else { return [] }
        
        var scannedTextInfos: [ResultType] = []
        
        let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        
        let request = VNRecognizeTextRequest { request, error in
            guard let observations = request.results as? [VNRecognizedTextObservation],
                  error == nil else {
                print("Error: Text recognition failed.")
                return
            }
            scannedTextInfos = completion(observations)
        }
        
        request.recognitionLanguages = ["en", "nl"]
        request.recognitionLevel = .accurate
        request.usesLanguageCorrection = true
        
        try? requestHandler.perform([request])
        
        return scannedTextInfos
    }
}

struct Result {
    let text: String
    let boundingBox: CGRect
}

func encodeResult(_ result: Result) -> [String: Any]? {
    return [
        "text": result.text,
        "boundingBox": [
            "origin": [
                "x": result.boundingBox.origin.x,
                "y": result.boundingBox.origin.y
            ],
            "size": [
                "width": result.boundingBox.size.width,
                "height": result.boundingBox.size.height
            ]
        ]
    ]
}

public class ReactNativeOcrModule: Module {
    
    let textRecognitionFunction = performTextRecognition { observations in
        var results = [[String: Any]?]()
        for currentObservation in observations {
            let topCandidate = currentObservation.topCandidates(1).first
        
            let text = topCandidate!.string
            let boundingBox = currentObservation.boundingBox
            
            let r = Result(text: text, boundingBox: boundingBox);
            results.append(encodeResult(r))
        }
        return results
    }
    
    public func definition() -> ModuleDefinition {
        Name("ReactNativeOcr")

        AsyncFunction("getTextFromImage") {(imageBase64: String, promise: Promise) in
            let imageData = Data(base64Encoded: imageBase64)
            let image = UIImage(data: imageData!)
            let results = textRecognitionFunction(image!)
            promise.resolve(results)
        }
    }
}
