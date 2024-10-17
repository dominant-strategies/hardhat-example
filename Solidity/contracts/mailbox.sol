// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PaymentChannelMailbox
 * @notice This contract allows users to send notifications to other users, and retrieve 
 *         notification messages. It acts as a substitution for BIP47 notification transactions 
 *         and provides a backup mechanism for users to retrieve their payment channel info in case 
 *         of a full wallet recovery.
 */
contract PaymentChannelMailbox {

    /// Track if a sender has already notified a recipient
    mapping(string => mapping(string => bool)) private hasNotified;

    /// Mapping from recipient's payment code to a list of sender payment codes (their notifications)
    mapping(string => string[]) private notifications;

    /**
     * @notice Event emitted when a notification is sent
     * @param senderPaymentCode The sender's payment code
     * @param receiverPaymentCode The receiver's payment code
     */
    event NotificationSent(string senderPaymentCode, string receiverPaymentCode);

    /**
     * @notice Sends a notification message to the recipient
     * @dev Must fail if the sender has already notified this recipient
     *      Creates an entry in the recipient's mailbox containing the sender's payment code
     *      Emits an event containing the sender's and receiver's payment codes
     * @param senderPaymentCode The sender's payment code
     * @param receiverPaymentCode The receiver's payment code
     */
    function notify(string memory senderPaymentCode, string memory receiverPaymentCode) public {
        // Check if sender has already notified the recipient
        require(!hasNotified[receiverPaymentCode][senderPaymentCode], "Sender has already notified this recipient");
      
        // Mark as notified
        hasNotified[receiverPaymentCode][senderPaymentCode] = true;

        // Store the sender's payment code in the recipient's mailbox
        notifications[receiverPaymentCode].push(senderPaymentCode);

        // Emit event with sender and receiver payment codes
        emit NotificationSent(senderPaymentCode, receiverPaymentCode);
    }

    /**
     * @notice Retrieves the list of payment codes for notification messages
     * @return An array of payment codes from senders who have notified the caller
     */
    function getNotifications(string memory receiverPaymentCode) public view returns (string[] memory) {
        // Return the notifications for the caller
        return notifications[receiverPaymentCode];
    }
}