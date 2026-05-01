import Foundation
import Vision
import AppKit
import PDFKit

let args = CommandLine.arguments
if args.count < 2 {
    print("Usage: swift ocr.swift <pdf_path>")
    exit(1)
}
let pdfPath = args[1]
let pdfURL = URL(fileURLWithPath: pdfPath)

guard let pdfDoc = PDFDocument(url: pdfURL) else {
    print("Failed to open PDF")
    exit(1)
}

for i in 0..<pdfDoc.pageCount {
    guard let page = pdfDoc.page(at: i) else { continue }
    let pageRect = page.bounds(for: .mediaBox)
    let renderer = ImageRenderer(size: pageRect.size)
    
    // Create an image from the PDF page
    let image = renderer.image { context in
        NSColor.white.set()
        context.fill(pageRect)
        
        context.cgContext.translateBy(x: 0.0, y: pageRect.size.height)
        context.cgContext.scaleBy(x: 1.0, y: -1.0)
        
        page.draw(with: .mediaBox, to: context.cgContext)
    }
    
    guard let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
    
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
}

class ImageRenderer {
    let size: NSSize
    init(size: NSSize) { self.size = size }
    func image(actions: (NSGraphicsContext) -> Void) -> NSImage {
        let image = NSImage(size: size)
        image.lockFocus()
        if let ctx = NSGraphicsContext.current {
            actions(ctx)
        }
        image.unlockFocus()
        return image
    }
}
