var SkyRTC = function() {
    var PeerConnection = (window.PeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection || window.mozRTCPeerConnection);
    var URL = (window.URL || window.webkitURL || window.msURL || window.oURL);
    var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    var nativeRTCIceCandidate = (window.mozRTCIceCandidate || window.RTCIceCandidate);
    var nativeRTCSessionDescription = (window.mozRTCSessionDescription || window.RTCSessionDescription); // order is very important: "RTCSessionDescription" defined in Nighly but useless
    var moz = !!navigator.mozGetUserMedia;
    var iceServer = {
        "iceServers": 
        [
//        {
//            url:'stun:192.168.10.151'
//        },
//        {
//            url: 'turn:192.168.10.151:3478',
//            "username":"cxhd",
//                        "credential":"afa407c48444d160"
//        },
         {
                        "url":"stun:47.102.193.81:3478"
                },
                {
                        "url":"turn:47.102.193.81:3478",
                        "username":"cxhd",
                        "credential":"afa407c48444d160"
                },
//        {
//            url:'stun:172.16.0.246'
//        },
//        {
//            url: 'turn:172.16.0.246:3478',
//            "username":"cxhd",
//                        "credential":"afa407c48444d160"
//        },
        {
            url:'stun:39.106.96.178'
        },
        {
            url: 'turn:39.106.96.178:3478',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA',
            username: '28224511:1379330808'
        }
        //         {
        //            url:'stun:120.234.14.50'
        //        },
        //        {
        //            url: 'turn:120.234.14.50',
        //            credential: 'ling1234',
        //            username: 'ling'
        //        }
        //        {
        //            url:'stun:183.232.150.35'
        //        },
        //        {
        //            url: 'turn:183.232.150.35',
        //            credential: 'ling1234',
        //            username: 'ling'
        //        },
        //        {
        //            url:'stun:47.105.164.14'
        //        },
        //        {
        //            url: 'turn:47.105.164.14',
        //            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA',
        //            username: '28224511:JZEOEt2V3Qb0y27GRntt2u2PAYA'
        //        },
        //        {
        //            url: 'turn:47.105.164.14:3478?transport=udp',
        //            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        //            username: '28224511:JZEOEt2V3Qb0y27GRntt2u2PAYA'
        //        },
        //        {
        //            url:'stun:stun01.sipphone.com'
        //        },
        //
        //        {
        //            url:'stun:stun.ekiga.net'
        //        },
        //
        //        {
        //            url:'stun:stun.fwdnet.net'
        //        },
        //
        //        {
        //            url:'stun:stun.ideasip.com'
        //        },
        //
        //        {
        //            url:'stun:stun.iptel.org'
        //        },
        //
        //        {
        //            url:'stun:stun.rixtelecom.se'
        //        },
        //
        //        {
        //            url:'stun:stun.schlund.de'
        //        },
        //
        //        {
        //            url:'stun:stun.l.google.com:19302'
        //        },
        //
        //        {
        //            url:'stun:stun1.l.google.com:19302'
        //        },
        //
        //        {
        //            url:'stun:stun2.l.google.com:19302'
        //        },
        //
        //        {
        //            url:'stun:stun3.l.google.com:19302'
        //        },
        //
        //        {
        //            url:'stun:stun4.l.google.com:19302'
        //        },
        //
        //        {
        //            url:'stun:stunserver.org'
        //        },
        //
        //        {
        //            url:'stun:stun.softjoys.com'
        //        },
        //
        //        {
        //            url:'stun:stun.voiparound.com'
        //        },
        //
        //        {
        //            url:'stun:stun.voipbuster.com'
        //        },
        //
        //        {
        //            url:'stun:stun.voipstunt.com'
        //        },
        //
        //        {
        //            url:'stun:stun.voxgratia.org'
        //        },
        //
        //        {
        //            url:'stun:stun.xten.com'
        //        },
        //
        //
        //        {
        //            url: 'turn:numb.viagenie.ca',
        //            credential: 'muazkh',
        //            username: 'webrtc@live.com'
        //        },
        //        {
        //            url: 'turn:192.158.29.39:3478?transport=udp',
        //            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        //            username: '28224511:1379330808'
        //        },
        //        {
        //            url: 'turn:192.158.29.39:3478?transport=tcp',
        //            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        //            username: '28224511:1379330808'
        //        }
        ]
    };
    var packetSize = 1000;

    /**********************************************************/
    /*                                                        */
    /*                       事件处�?�器                       */
    /*                                                        */
    /**********************************************************/
    function EventEmitter() {
        this.events = {};
    }
    //绑定事件函数
    EventEmitter.prototype.on = function(eventName, callback) {

        // console.log(eventName)
        // console.log(callback)

        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    };
    //触�?�事件函数
    EventEmitter.prototype.emit = function(eventName, _) {

        var events = this.events[eventName],
        args = Array.prototype.slice.call(arguments, 1),
        i, m;

        if (!events) {
            return;
        }
        for (i = 0, m = events.length; i < m; i++) {
            events[i].apply(null, args);
        }


    };


    /**********************************************************/
    /*                                                        */
    /*                   �?�?�信�?�建立部分                     */
    /*                                                        */
    /**********************************************************/


    /*******************基础部分*********************/
    function skyrtc() {
        //本地media stream
        this.localMediaStream = null;
        //所在房间
        this.room = "";
        //接收文件时用于暂存接收文件
        this.fileData = {};
        //本地WebSocket连接
        this.socket = null;
        //本地socket的id，由�?��?��?务器创建
        this.me = null;
        //我的名称
        this.myName = null;
        //主播的数据json字符串
        this.liveBroadcast = {};
        //�?存所有与本地相连的peer connection， 键为socket id，值为PeerConnection类型
        this.peerConnections = {};
        //�?存所有与本地连接的socket的id
        this.connections = [];
        //�?始时需�?构建链接的数目
        this.numStreams = 0;
        //�?始时已�?连接的数目
        this.initializedStreams = 0;
        //�?存所有的data channel，键为socket id，值通过PeerConnection实例的createChannel创建
        this.dataChannels = {};
        //�?存所有�?�文件的data channel�?�其�?�文件状�?
        this.fileChannels = {};
        //�?存所有接�?�到的文件
        this.receiveFiles = {};
        //所有连接的数据
        //this.connecteData = [];

        // setInterval(() => {
        //     console.log(this.peerConnections);
        //     console.log(this.connections);
        // },3000);
    }
    //继承自事件处�?�器，�??供绑定事件和触�?�事件的功能
    skyrtc.prototype = new EventEmitter();

    /*************************�?务器连接部分***************************/


    //本地连接信�?�，信�?�为websocket
    skyrtc.prototype.connect = function(server, room, nickName,liveBroadcast) {
        var socket,
        that = this;
        room = room || "";
        nickName = nickName || "NA";
        that.myName = nickName;
        if(liveBroadcast){
            that.liveBroadcast = liveBroadcast; 
        };
        
        socket = this.socket = new WebSocket(server);
        socket.onopen = function() {

            socket.send(JSON.stringify({
                "eventName": "__join",
                "data": {
                    "room": room,
                    "nickName":nickName,
                    "liveBroadcast":JSON.stringify(that.liveBroadcast)
                }
            }));
            //that.emit("socket_opened", socket);
        };

        socket.onmessage = function(message) {

            var json = JSON.parse(message.data);

            console.log(json)

            if (json.eventName) {


                if(json.eventName == "jason_connect"){

                    console.log(json)

                }else{
                    that.emit(json.eventName, json.data);
                };
                
            } else {
                that.emit("socket_receive_message", socket, json);
            }
        };

        socket.onerror = function(error) {
            that.emit("socket_error", error, socket);
        };

        socket.onclose = function(data) {

            if(that.localMediaStrea){
                that.localMediaStream.close();
            };
            
            var pcs = that.peerConnections;
            for (i = pcs.length; i--;) {
                that.closePeerConnection(pcs[i]);
            }
            that.peerConnections = [];
            that.dataChannels = {};
            that.fileChannels = {};
            that.connections = [];
            that.fileData = {};
            that.emit('socket_closed', socket);
        };

        this.on('_peers', function(data) {

            console.log(data);

            //获�?�所有�?务器上的
            that.connections = data.connections;
            that.me = data.you;

            that.emit("get_peers", that.connections);
            that.emit('connected', socket);
        });

        this.on("_ice_candidate", function(data) {


            var candidate = new nativeRTCIceCandidate(data);
            var pc = that.peerConnections[data.socketId];
            pc.addIceCandidate(candidate);
            that.emit('get_ice_candidate', candidate);
        });

        this.on('_new_peer', function(data) {

            console.log(data)
            //            try{
            that.connections.push({
                id:data.socketId,
                name:data.nickName,
                "liveBroadcast":data.liveBroadcast
            });

            var pc = that.createPeerConnection(data.socketId,data.nickName,data.liveBroadcast),
            i, m; 

            pc.addStream(that.localMediaStream);
                
            that.emit('new_peer', data.socketId); 
        });

        this.on('_remove_peer', function(data) {
            var sendId;
            that.closePeerConnection(that.peerConnections[data.socketId]);
            delete that.peerConnections[data.socketId];
            delete that.dataChannels[data.socketId];
            for (sendId in that.fileChannels[data.socketId]) {
                that.emit("send_file_error", new Error("Connection has been closed"), data.socketId, sendId, that.fileChannels[data.socketId][sendId].file);
            }
            delete that.fileChannels[data.socketId];
            that.emit("remove_peer", data.socketId,data.liveBroadcast);
        });

        this.on('_offer', function(data) {
            that.receiveOffer(data.socketId, data.sdp);
            that.emit("get_offer", data);
        });

        this.on('_answer', function(data) {
            that.receiveAnswer(data.socketId, data.sdp);
            that.emit('get_answer', data);
        });

        this.on('send_file_error', function(error, socketId, sendId, file) {
            that.cleanSendFile(sendId, socketId);
        });

        this.on('receive_file_error', function(error, sendId) {
            that.cleanReceiveFile(sendId);
        });

        this.on('ready', function() {
            console.log("...");
            that.createPeerConnections();
            that.addStreams();
            that.addDataChannels();
            that.sendOffers();
        });
    };


    /*************************�?处�?�部分*******************************/


    //创建本地�?
    skyrtc.prototype.createStream = function(options) {
        var that = this;

        options.video = !!options.video;
        options.audio = !!options.audio;

        var audioEnabled=true;
        try {
            if (Request.QueryString("audio")=="false"){
                audioEnabled=false;
            }
        } catch(e){}
        
        if (getUserMedia) {
            this.numStreams++;
            getUserMedia.call(navigator, {
                video: {
                    deviceId: videoSelect.value,
                    width: {
                        min: 640, 
                        ideal: 1920, 
                        max: 1920
                    },
                    height: {
                        min: 480, 
                        ideal: 1080, 
                        max: 1080
                    }
                },
                audio: audioEnabled
            }, function(stream) {
                that.localMediaStream = stream;
                that.initializedStreams++;
                that.emit("stream_created", stream,that.me);
                if (that.initializedStreams === that.numStreams) {
                    that.emit("ready");
                }
            },
            function(error) {
                //that.emit("stream_create_error", error);
                getUserMedia.call(navigator, {
                    video: {
                        deviceId: videoSelect.value,
                        width: {
                            min: 640, 
                            ideal: 1920, 
                            max: 1920
                        },
                        height: {
                            min: 480, 
                            ideal: 1080, 
                            max: 1080
                        }
                    },
                    audio: false
                }, function(stream) {
                    that.localMediaStream = stream;
                    that.initializedStreams++;
                    that.emit("stream_created", stream);
                    if (that.initializedStreams === that.numStreams) {
                        that.emit("ready");
                    }
                },
                function(error) {
                    console.log("stream_create_error2");
                    that.emit("stream_create_error", error);
                });
            });
        } else {
            that.emit("stream_create_error", new Error('WebRTC is not yet supported in this browser.'));
        }
    };

    //将本地�?添加到所有的PeerConnection实例中
    skyrtc.prototype.addStreams = function() {
        var i, m,
        stream,
        connection;
        for (connection in this.peerConnections) {
            try {
                this.peerConnections[connection].addStream(this.localMediaStream); 
            } catch(e){
                console.log("addStreams:"+e);
            }
            
        }
    };

    //将�?绑定到video标签上用于输出
    skyrtc.prototype.attachStream = function(stream, domId) {
        var element = document.getElementById(domId);
        if (navigator.mozGetUserMedia) {
            element.mozSrcObject = stream;
            element.play();
        } else {
            try {
                element.src = webkitURL.createObjectURL(stream);
            } catch(e){
                element.srcObject = stream;
            }
            
        }
        try {
            element.src = webkitURL.createObjectURL(stream);
        } catch(e){
            element.srcObject = stream;
        }
    };


    /***********************信令交�?�部分*******************************/


    //�?�所有PeerConnection�?��?Offer类型信令
    skyrtc.prototype.sendOffers = function() {
        var i, m,
        pc,
        that = this,
        pcCreateOfferCbGen = function(pc, socketId) {
            return function(session_desc) {
                pc.setLocalDescription(session_desc);
                that.socket.send(JSON.stringify({
                    "eventName": "__offer",
                    "data": {
                        "sdp": session_desc,
                        "socketId": socketId,
                    }
                }));
            };
        },
        pcCreateOfferErrorCb = function(error) {
            console.log(error);
        };
        for (i = 0, m = this.connections.length; i < m; i++) {
            pc = this.peerConnections[this.connections[i].id];
            pc.createOffer(pcCreateOfferCbGen(pc, this.connections[i].id), pcCreateOfferErrorCb);
        }
    };

    //接收到Offer类型信令�?�作为回应返回answer类型信令
    skyrtc.prototype.receiveOffer = function(socketId, sdp) {
        var pc = this.peerConnections[socketId];
        this.sendAnswer(socketId, sdp);
    };

    //�?��?answer类型信令
    skyrtc.prototype.sendAnswer = function(socketId, sdp) {
        var pc = this.peerConnections[socketId];
        var that = this;
        pc.setRemoteDescription(new nativeRTCSessionDescription(sdp));
        pc.createAnswer(function(session_desc) {
            pc.setLocalDescription(session_desc);
            that.socket.send(JSON.stringify({
                "eventName": "__answer",
                "data": {
                    "socketId": socketId,
                    "sdp": session_desc
                }
            }));
        }, function(error) {
            console.log(error);
        });
    };

    //接收到answer类型信令�?�将对方的session�??述写入PeerConnection中
    skyrtc.prototype.receiveAnswer = function(socketId, sdp) {
        var pc = this.peerConnections[socketId];
        pc.setRemoteDescription(new nativeRTCSessionDescription(sdp));
    };


    /***********************点对点连接部分*****************************/


    //创建与其他用户连接的PeerConnections
    skyrtc.prototype.createPeerConnections = function() {
        var i, m;
        for (i = 0, m = this.connections.length; i < m; i++) {
            this.createPeerConnection(this.connections[i].id,this.connections[i].name,this.connections[i].liveBroadcast);
        }
    };

    //创建�?�个PeerConnection
    skyrtc.prototype.createPeerConnection = function(socketId,name,liveBroadcast) {
        var that = this;
        var pc = new PeerConnection(iceServer);

        //绑定该用户名称
        pc["nickName"] = name;
        //名称
        var newName = "";
        if(name){
            newName = name;
        };
        this.peerConnections[socketId] = pc;
        pc.onicecandidate = function(evt) {
            if (evt.candidate){
                that.socket.send(JSON.stringify({
                    "eventName": "__ice_candidate",
                    "data": {
                        "label": evt.candidate.sdpMLineIndex,
                        "candidate": evt.candidate.candidate,
                        "socketId": socketId,
                    }
                }));
            };

            that.emit("pc_get_ice_candidate", evt.candidate, socketId,newName, pc);
        };

        pc.onopen = function() {
            that.emit("pc_opened", socketId, pc);
        };

        pc.onaddstream = function(evt) {


            that.emit('pc_add_stream', evt.stream, socketId, newName,pc,liveBroadcast);
        };

        pc.ondatachannel = function(evt) {
            console.log(evt);
            that.addDataChannel(socketId, evt.channel,name);
            that.emit('pc_add_data_channel', evt.channel, socketId, pc);
        };
        return pc;
    };

    //关闭PeerConnection连接
    skyrtc.prototype.closePeerConnection = function(pc) {
        if (!pc) return;
        pc.close();
    };


    /***********************数�?�通�?�连接部分*****************************/


    //消�?�广播
    skyrtc.prototype.broadcast = function(message) {

        for (let socketId in this.dataChannels) {
            this.sendMessage(message, socketId);
        }
    };

    //�?��?消�?�方法
    skyrtc.prototype.sendMessage = function(message, socketId) {
        if (this.dataChannels[socketId].readyState.toLowerCase() === 'open') {
            this.dataChannels[socketId].send(JSON.stringify({
                type: "__msg",
                data: message
            }));
        }
    };

    //对所有的PeerConnections创建Data channel
    skyrtc.prototype.addDataChannels = function() {

        for (let connection in this.peerConnections) {
            this.createDataChannel(connection);
        }
    };

    //对�?一个PeerConnection创建Data channel
    skyrtc.prototype.createDataChannel = function(socketId, label) {
        var pc, key, channel;
        pc = this.peerConnections[socketId];

        console.log(pc)

        if (!socketId) {
            this.emit("data_channel_create_error", socketId, new Error("attempt to create data channel without socket id"));
        }

        if (!(pc instanceof PeerConnection)) {
            this.emit("data_channel_create_error", socketId, new Error("attempt to create data channel without peerConnection"));
        }
        try {
            channel = pc.createDataChannel(label);
        } catch (error) {
            this.emit("data_channel_create_error", socketId, error);
        }

        return this.addDataChannel(socketId, channel,pc.nickName);
    };

    //为Data channel绑定相应的事件回调函数
    skyrtc.prototype.addDataChannel = function(socketId, channel,name) {
        var that = this;
        channel.onopen = function() {
            that.emit('data_channel_opened', channel, socketId);
        };

        channel.onclose = function(event) {
            delete that.dataChannels[socketId];
            that.emit('data_channel_closed', channel, socketId);
        };

        channel.onmessage = function(message) {

            var json;
            json = JSON.parse(message.data);
            if (json.type === '__file') {
                /*that.receiveFileChunk(json);*/
                that.parseFilePacket(json, socketId);
            } else {
                that.emit('data_channel_message', channel, socketId, json.data,name);
            }
        };

        channel.onerror = function(err) {
            that.emit('data_channel_error', channel, socketId, err);
        };

        this.dataChannels[socketId] = channel;
        return channel;
    };



    /**********************************************************/
    /*                                                        */
    /*                       文件传输                         */
    /*                                                        */
    /**********************************************************/

    /************************公有部分************************/

    //解�?Data channel上的文件类型包,�?�确定信令类型
    skyrtc.prototype.parseFilePacket = function(json, socketId) {
        var signal = json.signal,
        that = this;
        if (signal === 'ask') {
            that.receiveFileAsk(json.sendId, json.name, json.size, socketId,json);
        } else if (signal === 'accept') {
            that.receiveFileAccept(json.sendId, socketId,json);
        } else if (signal === 'refuse') {
            console.log(json)
            that.receiveFileRefuse(json.sendId, socketId,json);
        } else if (signal === 'chunk') {
            that.receiveFileChunk(json.data, json.sendId, socketId, json.last, json.percent);
        } else if (signal === 'close') {
        //TODO
        }
    };

    /***********************�?��?者部分***********************/


    //通过Dtata channel�?�房间内所有其他用户广播文件
    skyrtc.prototype.shareFile = function(dom,nickName) {
        var socketId,
        that = this;
        for (socketId in that.dataChannels) {
            that.sendFile(dom, socketId,nickName);
        }
    };

    //发送文件
    skyrtc.prototype.sendFile = function(dom, socketId,nickName) {
        var that = this,
        file,
        reader,
        fileToSend,
        sendId;
        if (typeof dom === 'string') {
            dom = document.getElementById(dom);
        }
        if (!dom) {
            that.emit("send_file_error", new Error("Can not find dom while sending file"), socketId);
            return;
        }
        if (!dom.files || !dom.files[0]) {
            that.emit("send_file_error", new Error("No file need to be sended"), socketId);
            return;
        }
        file = dom.files[0];
        that.fileChannels[socketId] = that.fileChannels[socketId] || {};
        sendId = that.getRandomString();
        fileToSend = {
            file: file,
            state: "ask"
        };
        that.fileChannels[socketId][sendId] = fileToSend;
        that.sendAsk(socketId, sendId, fileToSend,nickName);
        that.emit("send_file", sendId, socketId, file);
    };

    //�?��?多个文件的碎片
    skyrtc.prototype.sendFileChunks = function() {
        var socketId,
        sendId,
        that = this,
        nextTick = false;
        for (socketId in that.fileChannels) {
            for (sendId in that.fileChannels[socketId]) {
                if (that.fileChannels[socketId][sendId].state === "send") {
                    nextTick = true;
                    that.sendFileChunk(socketId, sendId);
                }
            }
        }
        if (nextTick) {
            setTimeout(function() {
                that.sendFileChunks();
            }, 10);
        }
    };

    //�?��?�?个文件的碎片
    skyrtc.prototype.sendFileChunk = function(socketId, sendId) {
        var that = this,
        fileToSend = that.fileChannels[socketId][sendId],
        packet = {
            type: "__file",
            signal: "chunk",
            sendId: sendId
        },
        channel;

        fileToSend.sendedPackets++;
        fileToSend.packetsToSend--;


        if (fileToSend.fileData.length > packetSize) {
            packet.last = false;
            packet.data = fileToSend.fileData.slice(0, packetSize);
            packet.percent = fileToSend.sendedPackets / fileToSend.allPackets * 100;
            that.emit("send_file_chunk", sendId, socketId, fileToSend.sendedPackets / fileToSend.allPackets * 100, fileToSend.file);
        } else {
            packet.data = fileToSend.fileData;
            packet.last = true;
            fileToSend.state = "end";
            that.emit("sended_file", sendId, socketId, fileToSend.file);
            that.cleanSendFile(sendId, socketId);
        }

        channel = that.dataChannels[socketId];

        if (!channel) {
            that.emit("send_file_error", new Error("Channel has been destoried"), socketId, sendId, fileToSend.file);
            return;
        }
        channel.send(JSON.stringify(packet));
        fileToSend.fileData = fileToSend.fileData.slice(packet.data.length);
    };

    //�?��?文件请求�?�若对方�?��?接�?�,开始传输
    skyrtc.prototype.receiveFileAccept = function(sendId, socketId,jData) {
        var that = this,
        fileToSend,
        reader,
        initSending = function(event, text) {
            fileToSend.state = "send";
            fileToSend.fileData = event.target.result;
            fileToSend.sendedPackets = 0;
            fileToSend.packetsToSend = fileToSend.allPackets = parseInt(fileToSend.fileData.length / packetSize, 10);
            that.sendFileChunks();
        };
        fileToSend = that.fileChannels[socketId][sendId];
        reader = new window.FileReader(fileToSend.file);
        reader.readAsDataURL(fileToSend.file);
        reader.onload = initSending;
        that.emit("send_file_accepted", sendId, socketId, that.fileChannels[socketId][sendId].file,jData);
    };

    //发送文件请求后若对方拒接,清除掉本地的文件信息
    skyrtc.prototype.receiveFileRefuse = function(sendId, socketId,jData) {

        console.log(jData)
        var that = this;
        that.fileChannels[socketId][sendId].state = "refused";
        that.emit("send_file_refused", sendId, socketId, that.fileChannels[socketId][sendId].file,jData);
        that.cleanSendFile(sendId, socketId);
    };

    //清除�?��?文件缓存
    skyrtc.prototype.cleanSendFile = function(sendId, socketId) {
        var that = this;
        delete that.fileChannels[socketId][sendId];
    };

    //发送文件请求
    skyrtc.prototype.sendAsk = function(socketId, sendId, fileToSend,nickName) {
        var that = this,
        channel = that.dataChannels[socketId],
        packet;
        if (!channel) {
            that.emit("send_file_error", new Error("Channel has been closed"), socketId, sendId, fileToSend.file);
        }
        packet = {
            name: fileToSend.file.name,
            size: fileToSend.file.size,
            sendId: sendId,
            type: "__file",
            signal: "ask",
            nickName:nickName
        };
        channel.send(JSON.stringify(packet));
    };

    //获得�?机字符串�?�生�?文件�?��?ID
    skyrtc.prototype.getRandomString = function() {
        return (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace(/\./g, '-');
    };

    /***********************接收者部分***********************/


    //接收到文件碎片
    skyrtc.prototype.receiveFileChunk = function(data, sendId, socketId, last, percent) {
        var that = this,
        fileInfo = that.receiveFiles[sendId];
        if (!fileInfo.data) {
            fileInfo.state = "receive";
            fileInfo.data = "";
        }
        fileInfo.data = fileInfo.data || "";
        fileInfo.data += data;
        if (last) {
            fileInfo.state = "end";
            that.getTransferedFile(sendId);
        } else {
            that.emit("receive_file_chunk", sendId, socketId, fileInfo.name, percent);
        }
    };

    //接收到所有文件碎片�?�将其组�?��?一个完整的文件并自动下载
    skyrtc.prototype.getTransferedFile = function(sendId) {
        var that = this,
        fileInfo = that.receiveFiles[sendId],
        hyperlink = document.createElement("a"),
        mouseEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        hyperlink.href = fileInfo.data;
        hyperlink.target = '_blank';
        hyperlink.download = fileInfo.name || dataURL;

        hyperlink.dispatchEvent(mouseEvent);
        (window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
        that.emit("receive_file", sendId, fileInfo.socketId, fileInfo.name);
        that.cleanReceiveFile(sendId);
    };

    //接收到�?��?文件请求�?�记录文件信�?�
    skyrtc.prototype.receiveFileAsk = function(sendId, fileName, fileSize, socketId,jData) {
        var that = this;
        that.receiveFiles[sendId] = {
            socketId: socketId,
            state: "ask",
            name: fileName,
            size: fileSize
        };
        that.emit("receive_file_ask", sendId, socketId, fileName, fileSize,jData);
    };

    //�?��?�?��?接收文件信令
    skyrtc.prototype.sendFileAccept = function(sendId) {
        var that = this,
        fileInfo = that.receiveFiles[sendId],
        channel = that.dataChannels[fileInfo.socketId],
        packet;

        var nickName = that.myName;
        if (!channel) {
            that.emit("receive_file_error", new Error("Channel has been destoried"), sendId, socketId);
        }
        packet = {
            type: "__file",
            signal: "accept",
            sendId: sendId,
            "nickName":nickName
        };
        channel.send(JSON.stringify(packet));
    };

    //对方拒接文件信息
    skyrtc.prototype.sendFileRefuse = function(sendId) {

        var that = this;
        var fileInfo = that.receiveFiles[sendId];
        var channel = that.dataChannels[fileInfo.socketId];
        var nickName = that.myName;
        

        var packet;
        if (!channel) {
            that.emit("receive_file_error", new Error("Channel has been destoried"), sendId, socketId);
        }
        packet = {
            type: "__file",
            signal: "refuse",
            sendId: sendId,
            "nickName":nickName
        };
        channel.send(JSON.stringify(packet));
        that.cleanReceiveFile(sendId);
    };

    //清除接�?�文件缓存
    skyrtc.prototype.cleanReceiveFile = function(sendId) {
        var that = this;
        delete that.receiveFiles[sendId];
    };

    return new skyrtc();
};