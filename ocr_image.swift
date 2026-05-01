import Foundation
import Vision
import AppKit

let args = CommandLine.arguments
if args.count < 2 {
    print("Usage: swift ocr_image.swift <image_path>")
    exit(1)
}
let imagePath = args[1]
let imageURL = URL(fileURLWithPath: imagePath)

guard let image = NSImage(contentsOf: imageURL),
      let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Failed to open image")
    exit(1)
}

let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
let request = VNRecognizeTextRequest { (request, error) in
    guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
    for observation in observations {
        guard let topCandidate = observation.topCandidates(1).first else { continue }
        print(topCandidate.string)
    }
}
request.recognitionLevel = .accurate
do {
    try requestHandler.perform([request])
} catch {
    print("Error: \(error)")
}
