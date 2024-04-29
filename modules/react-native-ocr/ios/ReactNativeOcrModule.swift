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

class Result {
    let text: String
    let boundingBox: CGRect
    
    init(text: String, boundingBox: CGRect) {
        self.text = text
        self.boundingBox = boundingBox
    }
}

public class ReactNativeOcrModule: Module {
    
    let textRecognitionFunction = performTextRecognition { observations in
        var results: [Result] = []
        for currentObservation in observations {
            let topCandidate = currentObservation.topCandidates(1).first
        
            let text = topCandidate!.string
            let boundingBox = currentObservation.boundingBox
            
            let r = Result(text: text, boundingBox: boundingBox);
            results.append(r)
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
