#!/usr/bin/env python3

import http.server
import socketserver
import sys
import os

# Default port number
PORT = 8000

# Allow the user to specify the port and directory (optional)
if len(sys.argv) > 1:
    try:
        PORT = int(sys.argv[1])
    except ValueError:
        print("Port must be an integer.")
        sys.exit(1)

if len(sys.argv) > 2:
    os.chdir(sys.argv[2])

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving HTTP on 0.0.0.0 port {PORT} (http://localhost:{PORT}/) ...")
    httpd.serve_forever()
