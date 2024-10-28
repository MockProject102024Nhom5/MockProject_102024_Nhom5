SELECT  [paymentId],
        [residentId],
        [paymentDate],
        [paymentTypeId],
        [amount],
        [paymentMethod],
        [deflag]
FROM [dbo].[payments]
WHERE   [paymentId]=@paymentId
