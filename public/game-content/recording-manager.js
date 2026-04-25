(function() {
    'use strict';

    const RecordingManager = {
        mediaRecorder: null,
        chunks: [],
        stream: null,
        isRecording: false,
        canvas: null,
        recordingStartTime: 0,
        mimeType: 'video/webm;codecs=vp9',

        init: function() {
            this.canvas = document.getElementById('canvas');
            if (!this.canvas) {
                console.error('RecordingManager: Canvas not found');
                return false;
            }
            console.log('RecordingManager: Canvas found, dimensions:', this.canvas.width, 'x', this.canvas.height);
            return true;
        },

        getSupportedMimeType: function() {
            const types = [
                'video/webm;codecs=vp9',
                'video/webm;codecs=vp8',
                'video/webm'
            ];

            for (const type of types) {
                if (MediaRecorder.isTypeSupported(type)) {
                    console.log('RecordingManager: Using mime type:', type);
                    return type;
                }
            }
            return 'video/webm';
        },

        start: function() {
            console.log('RecordingManager: Start called');

            if (this.isRecording) {
                this.postStatus('error', 'Already recording');
                return false;
            }

            if (!this.canvas) {
                if (!this.init()) {
                    this.postStatus('error', 'Canvas not found');
                    return false;
                }
            }

            try {
                console.log('RecordingManager: Attempting captureStream');
                this.stream = this.canvas.captureStream(30);
                console.log('RecordingManager: captureStream success');
            } catch (e) {
                this.postStatus('error', 'Canvas capture not supported: ' + e.message);
                console.error('RecordingManager: captureStream failed', e);
                return false;
            }

            this.mimeType = this.getSupportedMimeType();

            try {
                this.mediaRecorder = new MediaRecorder(this.stream, {
                    mimeType: this.mimeType
                });
                console.log('RecordingManager: MediaRecorder created');
            } catch (e) {
                console.error('RecordingManager: MediaRecorder creation failed, trying without options', e);
                this.mediaRecorder = new MediaRecorder(this.stream);
            }

            this.chunks = [];

            this.mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    this.chunks.push(e.data);
                }
            };

            this.mediaRecorder.onstop = () => {
                console.log('RecordingManager: onstop, chunks:', this.chunks.length);
                const blob = new Blob(this.chunks, {
                    type: this.mimeType.split(';')[0]
                });
                const url = URL.createObjectURL(blob);

                this.postStatus('download', url);

                setTimeout(() => {
                    URL.revokeObjectURL(url);
                }, 60000);

                this.cleanup();
            };

            this.mediaRecorder.onerror = (e) => {
                this.postStatus('error', 'Recording error');
                this.cleanup();
            };

            this.chunks = [];
            this.mediaRecorder.start(100);
            this.isRecording = true;
            this.recordingStartTime = Date.now();

            this.postStatus('started');

            setTimeout(() => {
                if (this.isRecording) {
                    this.sendTimeUpdate();
                }
            }, 1000);

            return true;
        },

        stop: function() {
            console.log('RecordingManager: Stop called, isRecording:', this.isRecording);
            if (!this.isRecording || !this.mediaRecorder) {
                this.postStatus('error', 'Not recording');
                return false;
            }

            this.mediaRecorder.stop();
            this.isRecording = false;

            this.sendTimeUpdate();
            this.postStatus('stopped');

            return true;
        },

        getStatus: function() {
            const hasCanvas = !!this.canvas || this.init();
            const hasCaptureStream = hasCanvas && typeof this.canvas?.captureStream === 'function';
            return {
                isRecording: this.isRecording,
                mimeType: this.mimeType,
                supported: hasCanvas,
                hasCaptureStream: hasCaptureStream,
                canvasDimensions: this.canvas ? `${this.canvas.width}x${this.canvas.height}` : 'N/A'
            };
        },

        cleanup: function() {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.stream = null;
            }
            this.mediaRecorder = null;
            this.isRecording = false;
        },

        postStatus: function(status, data) {
            console.log('RecordingManager: postStatus', status, data);
            window.parent.postMessage({
                type: 'recording-status',
                status: status,
                data: data
            }, '*');
        },

        sendTimeUpdate: function() {
            if (this.isRecording) {
                const elapsed = Math.floor((Date.now() - this.recordingStartTime) / 1000);
                this.postStatus('timeupdate', elapsed);

                setTimeout(() => {
                    if (this.isRecording) {
                        this.sendTimeUpdate();
                    }
                }, 1000);
            }
        }
    };

    window.GodotRecordingManager = RecordingManager;

    window.addEventListener('message', function(e) {
        if (e.data && e.data.type === 'recording-command') {
            console.log('RecordingManager: Received command', e.data.command);
            switch (e.data.command) {
                case 'start':
                    RecordingManager.start();
                    break;
                case 'stop':
                    RecordingManager.stop();
                    break;
                case 'status':
                    RecordingManager.postStatus('status', RecordingManager.getStatus());
                    break;
            }
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            RecordingManager.init();
        });
    } else {
        RecordingManager.init();
    }

    console.log('RecordingManager: Script loaded');
})();