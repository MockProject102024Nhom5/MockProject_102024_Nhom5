SELECT  [paymentId],
        [residenId],
        [paymentDate],
        [paymentTypeId],
        [description],
        [amount],
        [paymentMethod],
        [deflag]
FROM [dbo].[payments]
WHERE   [paymentId]=@paymentId
