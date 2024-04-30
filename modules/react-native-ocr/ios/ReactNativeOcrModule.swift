import ExpoModulesCore
import Foundation
import Vision

struct Result {
    let text: String
    let boundingBox: CGRect
}

func encodeResult(_ result: Result) -> [String: Any]? {
    return [
        "text": result.text,
        "boundingBox": [
            "x": result.boundingBox.origin.x,
            "y": result.boundingBox.origin.y,
            "width": result.boundingBox.size.width,
            "height": result.boundingBox.size.height
        ]
    ]
}

func observationToRect(box: VNRectangleObservation, image: UIImage) -> CGRect
{
    let bbBox = box.boundingBox
    let bottomToTopTransform = CGAffineTransform(scaleX: 1, y: -1).translatedBy(x: 0, y: -1)
    let rect = bbBox.applying(bottomToTopTransform)
    return VNImageRectForNormalizedRect(rect, Int(image.size.width), Int(image.size.height))
}

public class ReactNativeOcrModule: Module {
    
    public func definition() -> ModuleDefinition {
        Name("ReactNativeOcr")
        
        AsyncFunction("getTextFromImage") {(imageBase64: String, promise: Promise) in
            let imageData = Data(base64Encoded: imageBase64)
            let image = UIImage(data: imageData!)
            guard let cgImage = image?.cgImage else {return}
            print(image!.imageOrientation)
            
            let requestHandler = VNImageRequestHandler(cgImage: cgImage)
            let request = VNRecognizeTextRequest(completionHandler: recognizeTextHandler)
            
            func recognizeTextHandler(request: VNRequest, error: Error?) {
                var results = [[String: Any]?]()
                guard let observations =
                        request.results as? [VNRecognizedTextObservation] else {
                    return
                }
                for observation in observations {
                    guard let topCandidate = observation.topCandidates(1).first else {return}
                    let stringRange = topCandidate.string.startIndex..<topCandidate.string.endIndex
                    let boxObservation = try? topCandidate.boundingBox(for: stringRange)
                    let boundingRect = observationToRect(box: boxObservation!, image: image!)
                    
                    let r = Result(text: topCandidate.string, boundingBox: boundingRect )
                    results.append(encodeResult(r))
                }
                promise.resolve(results)
            }
            
            
            do {
                try requestHandler.perform([request])
            } catch {
                print("Unable to perform the requests: \(error).")
            }
        }
    }
}
