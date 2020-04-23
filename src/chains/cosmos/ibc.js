const Root = require('./tx/tx');
const Amino = require("../base");
const Utils = require('../../util/utils');
const Config = require('../../../config');
const MsgTransfer = Root.cosmos.MsgTransfer;

MsgTransfer.prototype.type = Config.cosmos.tx.ibcTransfer.prefix;
MsgTransfer.prototype.GetSignBytes = function () {
    let msg = {
        source_port: this.SrcPort,
        source_channel: this.SrcChannel,
        dest_height: this.DestinationHeight,
        amount: this.Amount,
        sender: this.Sender,
        receiver: this.Receiver
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgTransfer.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.SrcPort)) {
        throw new Error("SrcPort is  empty");
    }
    if (Utils.isEmpty(this.SrcChannel)) {
        throw new Error("SrcChannel is  empty");
    }
    if (Utils.isEmpty(this.DestinationHeight)) {
        throw new Error("DestinationHeight is  empty");
    }
    if (Utils.isEmpty(this.Amount)) {
        throw new Error("Amount is  empty");
    }
    if (Utils.isEmpty(this.Sender)) {
        throw new Error("Sender is  empty");
    }
    if (Utils.isEmpty(this.Receiver)) {
        throw new Error("Receiver is  empty");
    }
};

MsgTransfer.prototype.GetMsg = function () {
    return {
        SrcPort: this.SrcPort,
        SrcChannel: this.SrcChannel,
        DestinationHeight: this.DestinationHeight,
        Amount: this.Amount,
        Sender: this.Sender,
        Receiver: this.Receiver
    }
};

MsgTransfer.prototype.GetDisplayContent = function () {
    return {
        i18n_tx_type: "i18n_ibc_transfer",
        i18n_source_port: this.SrcPort,
        i18n_source_channel: this.SrcChannel,
        i18n_dest_height: this.DestinationHeight,
        i18n_amount: this.Amount,
        i18n_sender: this.Sender,
        i18n_receiver: this.Receiver
    }
};

MsgTransfer.prototype.toJSON = function () {
    return {
        SrcPort: this.SrcPort,
        SrcChannel: this.SrcChannel,
        DestinationHeight: this.DestinationHeight,
        Amount: this.Amount,
        Sender: this.Sender,
        Receiver: this.Receiver
    }
};

module.exports = class IBC {
    static createMsgTransfer(req) {
        return new MsgTransfer({
            SrcPort: req.msg.source_port,
            SrcChannel: req.msg.source_channel,
            DestinationHeight: req.msg.dest_height,
            Amount: req.msg.amount,
            Sender: req.from,
            Receiver: req.msg.receiver
        });
    }
};